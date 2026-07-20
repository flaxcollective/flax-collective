import { NextResponse } from "next/server";
import { sendSignupOTPEmail } from "@/lib/mailer";
import { getDb } from "@/lib/mongodb";
import { verifyRecaptcha } from "@/lib/recaptcha";

export const runtime = "nodejs";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: Request) {
  try {
    const { email, recaptchaToken, isResend } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const signupOtps = db.collection("signup_otps");
    const normalizedEmail = email.toLowerCase().trim();

    // Verify reCAPTCHA if it's a new request
    if (!isResend) {
      const isHuman = await verifyRecaptcha(recaptchaToken as string);
      if (!isHuman) {
        return NextResponse.json(
          { success: false, message: "reCAPTCHA verification failed. Please try again." },
          { status: 400 }
        );
      }
    } else {
      // If resend, ensure an OTP record already exists to prevent bypass abuse
      const existingOtp = await signupOtps.findOne({ email: normalizedEmail });
      if (!existingOtp) {
        return NextResponse.json(
          { success: false, message: "No active OTP request found. Please sign up again." },
          { status: 400 }
        );
      }
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const users = db.collection("users");

    // Check if the user already exists
    const existingUser = await users.findOne({ email: normalizedEmail });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already registered" },
        { status: 409 }
      );
    }

    const otp = generateOTP();
    const otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes validity
    
    // Upsert the OTP record
    await signupOtps.updateOne(
      { email: normalizedEmail },
      { $set: { otp, otpExpiry } },
      { upsert: true }
    );

    const emailSent = await sendSignupOTPEmail(normalizedEmail, otp);

    if (emailSent) {
      return NextResponse.json({
        success: true,
        message: "Verification code sent to your email",
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Failed to send verification email" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Send OTP signup error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error: " + (error.message || "Unknown error") },
      { status: 500 }
    );
  }
}
