
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "signup.json");

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

        // ✅ Validate password strength
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

    // Find user (case insensitive)
    const userIndex = users.findIndex(
      (u: any) => u.email?.toLowerCase() === email.toLowerCase()
    );

    if (userIndex === -1) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const user = users[userIndex];

    // Check if OTP exists
    if (!user.otp || !user.otpExpiry) {
      return NextResponse.json(
        { success: false, message: "No OTP request found" },
        { status: 400 }
      );
    }

    // Verify OTP
    if (user.otp !== otp) {
      return NextResponse.json(
        { success: false, message: "Invalid OTP" },
        { status: 400 }
      );
    }

    // Check OTP expiry
    if (Date.now() > user.otpExpiry) {
      return NextResponse.json(
        { success: false, message: "OTP has expired" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user
    users[userIndex].password = hashedPassword;
    users[userIndex].otp = null;
    users[userIndex].otpExpiry = null;

    // Save updated data
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));

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