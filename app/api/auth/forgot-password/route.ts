// app/api/auth/forgot-password/route.ts
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { sendOTPEmail } from "@/lib/mailer";

const filePath = path.join(process.cwd(), "data", "signup.json");

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

    
    let users = [];
    try {
      const fileData = await fs.readFile(filePath, "utf-8");
      users = JSON.parse(fileData);
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "User data not found" },
        { status: 500 }
      );
    }

  
    const userIndex = users.findIndex(
      (u: any) => u.email?.toLowerCase() === email.toLowerCase()
    );

    if (userIndex === -1) {
      return NextResponse.json(
        { success: false, message: "No account found with this email" },
        { status: 404 }
      );
    }

    const otp = generateOTP();

  
    users[userIndex].otp = otp;
    users[userIndex].otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes

    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));

  
    const emailSent = await sendOTPEmail(email, otp);

    if (emailSent) {
      return NextResponse.json({
        success: true,
        message: "OTP sent successfully to your email",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to send OTP email",
      }, { status: 500 });
    }
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error"
    }, { status: 500 });
  }
}