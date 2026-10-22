import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS } from "@/lib/db/collections";
import { initiateICICISale } from "@/lib/payment/icici";

export const runtime = "nodejs";

// GET enrollment details and available courses for payment page
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Enrollment ID is required." },
        { status: 400 }
      );
    }

    let filter: any = { _id: id };
    if (ObjectId.isValid(id)) {
      filter = { $or: [{ _id: id }, { _id: new ObjectId(id) }] };
    }

    const db = await getDb();
    const enrollment = await db.collection(COLLECTIONS.ENROLLMENTS).findOne(filter);

    if (!enrollment) {
      return NextResponse.json(
        { success: false, message: "Enrollment record not found." },
        { status: 404 }
      );
    }

    // Fetch active courses and e-certifications for switching option
    const courses = await db.collection(COLLECTIONS.COURSES).find({}).toArray();
    const exams = await db.collection(COLLECTIONS.E_CERTIFICATIONS).find({ isActive: { $ne: false } }).toArray();

    return NextResponse.json({
      success: true,
      enrollment: {
        id: enrollment._id.toString(),
        firstName: enrollment.firstName || "",
        lastName: enrollment.lastName || "",
        studentName: `${enrollment.firstName || ""} ${enrollment.lastName || ""}`.trim() || "Student",
        email: enrollment.email || "",
        countryCode: enrollment.countryCode || "+91",
        mobile: enrollment.mobile || "",
        country: enrollment.country || "India",
        state: enrollment.state || "",
        city: enrollment.city || "",
        course: enrollment.course || "",
        courseId: enrollment.courseId || "",
        amount: enrollment.amount || 0,
        type: enrollment.type || "course",
        status: enrollment.status || "pending_payment",
        submittedAt: enrollment.submittedAt,
        merchantTxnNo: enrollment.merchantTxnNo,
      },
      availableCourses: courses.map(c => ({
        id: c.courseId || c._id.toString(),
        title: c.title,
        price: parseFloat(c.price || "0"),
        type: "course",
      })),
      availableExams: exams.map(e => ({
        id: e.examId || e._id.toString(),
        title: e.title,
        price: parseFloat(e.discountedPrice || e.price || "0"),
        type: "exam",
      })),
    });
  } catch (error: any) {
    console.error("[GET ENROLLMENT PAY ERROR]", error);
    return NextResponse.json(
      { success: false, message: "Error loading enrollment data." },
      { status: 500 }
    );
  }
}

// POST initiate or resume payment for existing enrollment
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { enrollmentId, course, type, mobile, city, state, country } = body;

    if (!enrollmentId) {
      return NextResponse.json(
        { success: false, message: "Enrollment ID is required." },
        { status: 400 }
      );
    }

    let filter: any = { _id: enrollmentId };
    if (ObjectId.isValid(enrollmentId)) {
      filter = { $or: [{ _id: enrollmentId }, { _id: new ObjectId(enrollmentId) }] };
    }

    const db = await getDb();
    const enrollment = await db.collection(COLLECTIONS.ENROLLMENTS).findOne(filter);

    if (!enrollment) {
      return NextResponse.json(
        { success: false, message: "Enrollment not found." },
        { status: 404 }
      );
    }

    if (enrollment.status === "completed") {
      return NextResponse.json({
        success: true,
        alreadyCompleted: true,
        message: "Payment for this enrollment is already completed.",
        redirectUrl: "/dashboard",
      });
    }

    const targetCourse = course || enrollment.course;
    const isExam = (type || enrollment.type) === "exam";

    let itemData: any = null;
    if (isExam) {
      itemData = await db.collection(COLLECTIONS.E_CERTIFICATIONS).findOne({
        $or: [{ title: targetCourse }, { examId: targetCourse }]
      });
    } else {
      itemData = await db.collection(COLLECTIONS.COURSES).findOne({
        $or: [{ title: targetCourse }, { courseId: targetCourse }]
      });
    }

    if (!itemData) {
      return NextResponse.json(
        { success: false, message: "Selected course or certification is invalid." },
        { status: 400 }
      );
    }

    const priceString = isExam ? (itemData.discountedPrice || itemData.price) : itemData.price;
    const price = parseFloat(priceString || "0");
    const targetItemId = isExam ? itemData.examId : itemData.courseId;
    const studentName = `${enrollment.firstName || ""} ${enrollment.lastName || ""}`.trim() || "Student";
    const cleanMobile = (mobile || enrollment.mobile || "").trim();
    const cleanEmail = (enrollment.email || "").trim().toLowerCase();

    // Generate fresh transaction number for this payment attempt
    const merchantTxnNo = `TXN-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Update enrollment with any updated course selection or contact details
    await db.collection(COLLECTIONS.ENROLLMENTS).updateOne(filter, {
      $set: {
        course: itemData.title,
        courseId: targetItemId,
        amount: price,
        type: isExam ? "exam" : "course",
        mobile: cleanMobile || enrollment.mobile,
        city: city || enrollment.city,
        state: state || enrollment.state,
        country: country || enrollment.country,
        merchantTxnNo,
        updatedAt: new Date(),
      }
    });

    // Record pending transaction
    const newTransaction = {
      merchantTxnNo,
      enrollmentId: enrollment._id,
      amount: price,
      status: "pending",
      createdAt: new Date(),
      email: cleanEmail,
      studentName,
      firstName: enrollment.firstName,
      lastName: enrollment.lastName,
      mobile: cleanMobile,
      phone: cleanMobile,
      countryCode: enrollment.countryCode || "+91",
      country: country || enrollment.country,
      state: state || enrollment.state,
      city: city || enrollment.city,
      course: itemData.title,
      courseId: targetItemId,
      type: isExam ? "exam" : "course"
    };
    await db.collection(COLLECTIONS.TRANSACTIONS).insertOne(newTransaction);

    // Simulated checkout bypass if explicit env variable is set or PG credentials missing
    const bypassPayment = process.env.BYPASS_PAYMENT === "true";
    const hasPGConfigs = process.env.ICICI_MERCHANT_ID && process.env.ICICI_SECURE_KEY && process.env.ICICI_INITIATE_SALE_URL;

    if (bypassPayment || !hasPGConfigs) {
      console.log("[PAYMENT BYPASS] Simulating checkout completion for reminder payment.");
      const pgTxnId = `MOCK_TXN_${Date.now()}`;
      await db.collection(COLLECTIONS.TRANSACTIONS).updateOne(
        { merchantTxnNo },
        { $set: { status: "success", pgTxnId, updatedAt: new Date() } }
      );

      const { completeEnrollment } = await import("@/lib/enrollment/service");
      await completeEnrollment(enrollment._id.toString(), pgTxnId);

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      return NextResponse.json({
        success: true,
        redirectUrl: `${baseUrl}/enrollment/status?success=true&txnNo=${merchantTxnNo}`,
        merchantTxnNo,
        amount: price,
        message: "Payment simulated successfully."
      });
    }

    // Call ICICI Initiate Sale Gateway
    const iciciRes = await initiateICICISale({
      merchantTxnNo,
      amount: price.toFixed(2),
      customerEmailID: cleanEmail,
      customerMobileNo: cleanMobile,
      customerName: studentName,
      addlParam1: targetItemId || "",
      addlParam2: enrollment._id.toString(),
    });

    if (iciciRes.responseCode === "000" && iciciRes.redirectURI) {
      let redirectUrl = iciciRes.redirectURI;
      if (iciciRes.tranCtx) {
        redirectUrl += `?tranCtx=${encodeURIComponent(iciciRes.tranCtx)}`;
      }
      return NextResponse.json({
        success: true,
        redirectUrl,
        enrollmentId: enrollment._id,
        merchantTxnNo,
        amount: price,
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: iciciRes.message || "Unable to initiate payment with ICICI gateway. Please try again.",
      },
      { status: 502 }
    );
  } catch (error: any) {
    console.error("[POST ENROLLMENT PAY ERROR]", error);
    return NextResponse.json(
      { success: false, message: error.message || "Server error initiating payment." },
      { status: 500 }
    );
  }
}
