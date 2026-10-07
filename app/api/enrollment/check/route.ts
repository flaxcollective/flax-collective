import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const course = searchParams.get("course");
    const type = searchParams.get("type");

    if (!email || !course) {
      return NextResponse.json(
        { success: false, message: "Email and course are required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      return NextResponse.json({ success: true, alreadyPurchased: false });
    }

    const db = await getDb();
    const isExam = type === "exam";

    let itemData: any = null;
    if (isExam) {
      itemData = await db.collection("exams").findOne({
        $or: [{ title: course }, { examId: course }]
      });
    } else {
      itemData = await db.collection("courses").findOne({
        $or: [{ title: course }, { courseId: course }]
      });
    }

    const targetItemId = itemData ? (isExam ? itemData.examId : itemData.courseId) : null;
    const emailEscaped = cleanEmail.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    const emailRegex = new RegExp(`^${emailEscaped}$`, "i");

    const existing = await db.collection("enrollments").findOne({
      email: { $regex: emailRegex },
      status: "completed",
      $or: [
        ...(targetItemId ? [{ courseId: targetItemId }] : []),
        { course: course },
        ...(itemData?.title ? [{ course: itemData.title }] : [])
      ]
    });

    if (existing) {
      const itemNoun = isExam ? "certification" : "course";
      return NextResponse.json({
        success: true,
        alreadyPurchased: true,
        itemType: isExam ? "exam" : "course",
        message: `You have already purchased this ${itemNoun} ("${course}") with this email (${cleanEmail}). Please log in to your account to access it.`
      });
    }

    return NextResponse.json({
      success: true,
      alreadyPurchased: false
    });
  } catch (err: any) {
    console.error("[ENROLLMENT CHECK ERROR]", err);
    return NextResponse.json(
      { success: false, message: "Error checking enrollment" },
      { status: 500 }
    );
  }
}
