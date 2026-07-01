import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/mongodb";
import { sendDeleteUserOTPEmail } from "@/lib/mailer";

export const runtime = "nodejs";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Please log in." },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const db = await getDb();
    const currentUser = await db.collection("users").findOne({ id: decoded.id });

    if (!currentUser || (currentUser.usertype !== "admin" && currentUser.usertype !== "employee")) {
      return NextResponse.json(
        { success: false, message: "Forbidden: Admin access required." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { targetUserId, password } = body;

    if (!targetUserId || !password) {
      return NextResponse.json(
        { success: false, message: "Missing targetUserId or admin password." },
        { status: 400 }
      );
    }

    // Verify admin/employee password
    const isMatch = await bcrypt.compare(password, currentUser.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Incorrect password. Authorization failed." },
        { status: 400 }
      );
    }

    // Load target user info to include in notification email
    const targetUser = await db.collection("users").findOne({ id: targetUserId });
    if (!targetUser) {
      return NextResponse.json(
        { success: false, message: "Target user not found." },
        { status: 404 }
      );
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes validity

    // Save/Upsert OTP record in deletion_otps collection
    const deletionOtps = db.collection("deletion_otps");
    await deletionOtps.updateOne(
      { adminId: currentUser.id, targetUserId },
      { $set: { otp, otpExpiry } },
      { upsert: true }
    );

    // Send email to security mailbox ONLY: flaxcollective@gmail.com
    const emailSent = await sendDeleteUserOTPEmail(
      "flaxcollective@gmail.com",
      otp,
      targetUser.name,
      currentUser.email
    );

    if (!emailSent) {
      return NextResponse.json(
        { success: false, message: "Failed to send verification OTP email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Admin password verified. Verification OTP sent to security mailbox (flaxcollective@gmail.com)."
    });
  } catch (error: any) {
    console.error("Delete User Initiate Error:", error);
    return NextResponse.json(
      { success: false, message: "Error initiating user deletion verification" },
      { status: 500 }
    );
  }
}
