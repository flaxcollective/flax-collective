import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { initiateICICISale } from "@/lib/payment/icici";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, unknown>;
    let { firstName, lastName, email, countryCode, mobile, country, state, city, course, recaptchaToken, type } = body;

    // Strict NoSQL Injection Type Checking
    if (
      typeof firstName !== "string" ||
      typeof lastName !== "string" ||
      typeof email !== "string" ||
      typeof countryCode !== "string" ||
      typeof mobile !== "string" ||
      typeof country !== "string" ||
      typeof state !== "string" ||
      typeof city !== "string" ||
      typeof course !== "string" ||
      (type !== undefined && type !== null && typeof type !== "string") ||
      (recaptchaToken !== undefined && recaptchaToken !== null && typeof recaptchaToken !== "string")
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid parameters. All fields must be text strings." },
        { status: 400 }
      );
    }

    // Ensure countryCode has +
    if (countryCode && !countryCode.startsWith("+")) {
      countryCode = "+" + countryCode;
    }

    if (!firstName || !lastName || !email || !countryCode || !mobile || !country || !state || !city || !course) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    const isHuman = await verifyRecaptcha(recaptchaToken);
    if (!isHuman) {
      return NextResponse.json(
        { success: false, message: "reCAPTCHA verification failed. Please try again." },
        { status: 400 }
      );
    }

    if (!/[a-zA-Z]/.test(city)) {
      return NextResponse.json(
        { success: false, message: "City name must contain letters." },
        { status: 400 }
      );
    }

    const db = await getDb();

    // Determine type (course vs exam)
    const isExam = type === "exam";
    let itemData = null;

    if (isExam) {
      itemData = await db.collection("exams").findOne({ title: course });
    } else {
      itemData = await db.collection("courses").findOne({ title: course });
    }

    if (!itemData) {
      return NextResponse.json(
        { success: false, message: `Selected ${isExam ? "exam" : "course"} is not valid.` },
        { status: 400 }
      );
    }

    // For exams, prioritize discountedPrice if available
    const priceString = isExam ? (itemData.discountedPrice || itemData.price) : itemData.price;
    const price = parseFloat(priceString || "0");
    const merchantTxnNo = `TXN-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newEntry = {
      submittedAt: new Date(),
      firstName,
      lastName,
      email,
      countryCode,
      mobile,
      country,
      state,
      city,
      course,
      courseId: isExam ? itemData.examId : itemData.courseId,
      amount: price,
      status: "pending_payment", // Default status prior to payment completion
      merchantTxnNo,
      type: isExam ? "exam" : "course"
    };

    const result = await db.collection("enrollments").insertOne(newEntry);

    // Record the pending transaction
    const newTransaction = {
      merchantTxnNo,
      enrollmentId: result.insertedId,
      amount: price,
      status: "pending",
      createdAt: new Date(),
      email,
      course,
      courseId: isExam ? itemData.examId : itemData.courseId,
      type: isExam ? "exam" : "course"
    };
    await db.collection("transactions").insertOne(newTransaction);

    // Simulated checkout bypass in dev or if PG credentials are not present in .env
    const isDev = process.env.NODE_ENV === "development";
    const hasPGConfigs = process.env.ICICI_MERCHANT_ID && process.env.ICICI_SECURE_KEY && process.env.ICICI_INITIATE_SALE_URL;

    if (isDev || !hasPGConfigs) {
      console.log("[PAYMENT BYPASS] Simulating checkout completion automatically.");

      // Mark transaction as successful
      const pgTxnId = `MOCK_TXN_${Date.now()}`;
      await db.collection("transactions").updateOne(
        { merchantTxnNo },
        { $set: { status: "success", pgTxnId, updatedAt: new Date() } }
      );

      // Finalize enrollment using completeEnrollment helper
      const { completeEnrollment } = await import("@/lib/enrollment/service");
      await completeEnrollment(result.insertedId.toString(), pgTxnId);

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      return NextResponse.json({
        success: true,
        redirectUrl: `${baseUrl}/enrollment/status?success=true&txnNo=${merchantTxnNo}`,
        enrollmentId: result.insertedId,
        merchantTxnNo,
        amount: price,
        message: "Payment simulated successfully. Redirecting..."
      });
    }

    try {
      // Call ICICI payment gateway to initiate checkout order
      const cleanMobile = mobile.replace(/\D/g, "");
      const pgResponse = await initiateICICISale({
        merchantTxnNo,
        amount: price.toFixed(2),
        customerEmailID: email,
        customerMobileNo: cleanMobile || "9999999999",
        customerName: `${firstName} ${lastName}`.trim(),
        addlParam1: isExam ? itemData.examId : itemData.courseId,
        addlParam2: result.insertedId.toString()
      });

      if (pgResponse.responseCode === "R1000" && pgResponse.redirectURI) {
        const redirectUrl = `${pgResponse.redirectURI}?tranCtx=${pgResponse.tranCtx || ""}`;
        return NextResponse.json({
          success: true,
          redirectUrl,
          enrollmentId: result.insertedId,
          merchantTxnNo,
          amount: price,
          message: "Enrollment initiated. Proceeding to payment..."
        });
      } else {
        throw new Error(pgResponse.message || "Payment gateway connection issue.");
      }
    } catch (pgErr: any) {
      console.error("[ICICI PG ERROR]", pgErr);
      
      // Update transaction state to failed
      await db.collection("transactions").updateOne(
        { merchantTxnNo },
        { $set: { status: "failed", error: pgErr.message || "Initiate sale failed" } }
      );

      return NextResponse.json(
        { success: false, message: `Payment setup failed: ${pgErr.message || "Please try again later."}` },
        { status: 502 }
      );
    }
  } catch (err: any) {
    console.error("[ENROLLMENT ERROR]", err);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again." },
      { status: 500 }
    );
  }
}