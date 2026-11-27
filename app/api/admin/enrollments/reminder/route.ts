import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS } from "@/lib/db/collections";
import { sendPaymentReminderEmail } from "@/lib/mailer";

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
    const currentUser = await db.collection(COLLECTIONS.USERS).findOne({ id: decoded.id });

    if (!currentUser || (currentUser.usertype !== "admin" && currentUser.usertype !== "employee")) {
      return NextResponse.json(
        { success: false, message: "Forbidden: Admin access required." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { enrollmentId } = body;

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

    const enrollment = await db.collection(COLLECTIONS.ENROLLMENTS).findOne(filter);

    if (!enrollment) {
      return NextResponse.json(
        { success: false, message: "Enrollment record not found." },
        { status: 404 }
      );
    }

    if (!enrollment.email) {
      return NextResponse.json(
        { success: false, message: "No email address found on this enrollment record." },
        { status: 400 }
      );
    }

    // Enforce 24-hour cooldown between fee reminder emails
    if (enrollment.lastReminderSentAt) {
      const lastSentTime = new Date(enrollment.lastReminderSentAt).getTime();
      const elapsedMs = Date.now() - lastSentTime;
      const cooldownMs = 24 * 60 * 60 * 1000;
      if (elapsedMs < cooldownMs) {
        const remainingHours = Math.ceil((cooldownMs - elapsedMs) / (1000 * 60 * 60));
        return NextResponse.json(
          {
            success: false,
            message: `A fee reminder was already sent within the last 24 hours. Please wait ${remainingHours} hour${remainingHours > 1 ? "s" : ""} before sending again.`,
          },
          { status: 429 }
        );
      }
    }

    const studentName = `${enrollment.firstName || ""} ${enrollment.lastName || ""}`.trim() || "Student";
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://flaxcollective.com";
    const paymentUrl = `${baseUrl}/enrollment/pay?id=${enrollment._id}`;

    const emailSent = await sendPaymentReminderEmail({
      email: enrollment.email,
      studentName,
      itemName: enrollment.course || "Registered Course",
      itemType: enrollment.type || "Course",
      amount: enrollment.amount || 0,
      paymentUrl,
    });

    if (!emailSent) {
      return NextResponse.json(
        { success: false, message: "Failed to send payment reminder email. Please check mailer settings." },
        { status: 502 }
      );
    }

    // Record timestamp of reminder sent
    const now = new Date();
    await db.collection(COLLECTIONS.ENROLLMENTS).updateOne(filter, {
      $set: {
        lastReminderSentAt: now,
      },
      $inc: {
        reminderCount: 1,
      },
    });

    const newCount = (typeof enrollment.reminderCount === "number" ? enrollment.reminderCount : 0) + 1;

    return NextResponse.json({
      success: true,
      message: `Payment reminder email successfully sent to ${enrollment.email}.`,
      lastReminderSentAt: now.toISOString(),
      reminderCount: newCount,
    });
  } catch (error: any) {
    console.error("[ADMIN SEND PAYMENT REMINDER ERROR]", error);
    return NextResponse.json(
      { success: false, message: "Error sending payment reminder: " + (error.message || "Server error") },
      { status: 500 }
    );
  }
}
