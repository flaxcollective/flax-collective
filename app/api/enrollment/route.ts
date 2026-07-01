import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { verifyRecaptcha } from "@/lib/recaptcha";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, unknown>;
    let { firstName, lastName, email, countryCode, mobile, country, state, city, course, recaptchaToken } = body;

    // Ensure countryCode has +
    if (typeof countryCode === "string" && countryCode && !countryCode.startsWith("+")) {
      countryCode = "+" + countryCode;
    }

    if (!firstName || !lastName || !email || !countryCode || !mobile || !country || !state || !city || !course) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    const isHuman = await verifyRecaptcha(recaptchaToken as string);
    if (!isHuman) {
      return NextResponse.json(
        { success: false, message: "reCAPTCHA verification failed. Please try again." },
        { status: 400 }
      );
    }

    if (typeof city === "string" && !/[a-zA-Z]/.test(city)) {
      return NextResponse.json(
        { success: false, message: "City name must contain letters." },
        { status: 400 }
      );
    }

    const db = await getDb();

    // Secure Pricing Verification: Lookup course details from the database
    const courseData = await db.collection("courses").findOne({ title: course });
    if (!courseData) {
      return NextResponse.json(
        { success: false, message: "Selected course is not valid." },
        { status: 400 }
      );
    }

    const price = parseFloat(courseData.price || "0");

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
      courseId: courseData.courseId,
      amount: price,
      status: "pending_payment" // Default status prior to payment completion
    };

    const result = await db.collection("enrollments").insertOne(newEntry);

    return NextResponse.json({
      success: true,
      enrollmentId: result.insertedId,
      amount: price,
      message: "Enrollment initiated. Proceeding to payment..."
    });
  } catch (err) {
    console.error("[ENROLLMENT ERROR]", err);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again." },
      { status: 500 }
    );
  }
}