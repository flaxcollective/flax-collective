import { NextResponse } from "next/server";
import { sendOTPEmail } from "@/lib/mailer";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const users = db.collection("users");

    const user = await users.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "No account found with this email" },
        { status: 404 }
      );
    }

    const otp = generateOTP();
    const otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes

    await users.updateOne(
      { email: email.toLowerCase().trim() },
      { $set: { otp, otpExpiry } }
    );

    const emailSent = await sendOTPEmail(email, otp);

    if (emailSent) {
      return NextResponse.json({
        success: true,
        message: "OTP sent successfully to your email",
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Failed to send OTP email" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}