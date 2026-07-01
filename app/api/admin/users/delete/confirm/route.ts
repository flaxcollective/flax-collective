import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";

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
    const { targetUserId, otp } = body;

    if (!targetUserId || !otp) {
      return NextResponse.json(
        { success: false, message: "Missing targetUserId or verification OTP." },
        { status: 400 }
      );
    }

    const deletionOtps = db.collection("deletion_otps");
    const otpRecord = await deletionOtps.findOne({ adminId: currentUser.id, targetUserId });

    if (!otpRecord) {
      return NextResponse.json(
        { success: false, message: "Verification request not found. Please initiate again." },
        { status: 400 }
      );
    }

    if (otpRecord.otp !== otp.trim()) {
      return NextResponse.json(
        { success: false, message: "Invalid verification code (OTP)." },
        { status: 400 }
      );
    }

    if (Date.now() > otpRecord.otpExpiry) {
      return NextResponse.json(
        { success: false, message: "Verification code has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // OTP is valid! Proceed with user deletion.
    const usersCol = db.collection("users");
    const targetUser = await usersCol.findOne({ id: targetUserId });

    if (!targetUser) {
      return NextResponse.json(
        { success: false, message: "User not found or already deleted." },
        { status: 404 }
      );
    }

    const deleteResult = await usersCol.deleteOne({ id: targetUserId });

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "User not found or already deleted." },
        { status: 404 }
      );
    }

    // Clean up OTP record
    await deletionOtps.deleteOne({ adminId: currentUser.id, targetUserId });

    // Clean up enrollments by email
    await db.collection("enrollments").deleteMany({ email: targetUser.email });

    return NextResponse.json({
      success: true,
      message: "User and associated enrollments deleted successfully."
    });
  } catch (error: any) {
    console.error("Delete User Confirm Error:", error);
    return NextResponse.json(
      { success: false, message: "Error confirming user deletion" },
      { status: 500 }
    );
  }
}
