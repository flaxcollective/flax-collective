import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

export async function POST(req: Request) {
  try {
    const { email, otp, password } = await req.json();

    if (!email || !otp || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
        },
        { status: 400 }
      );
    }

    const db = await getDb();
    const users = db.collection("users");

    const user = await users.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    if (!user.otp || !user.otpExpiry) {
      return NextResponse.json(
        { success: false, message: "No OTP request found" },
        { status: 400 }
      );
    }

    if (user.otp !== otp) {
      return NextResponse.json(
        { success: false, message: "Invalid OTP" },
        { status: 400 }
      );
    }

    if (Date.now() > user.otpExpiry) {
      return NextResponse.json(
        { success: false, message: "OTP has expired" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await users.updateOne(
      { email: email.toLowerCase().trim() },
      {
        $set: { password: hashedPassword, updatedAt: new Date().toISOString() },
        $unset: { otp: "", otpExpiry: "" },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}