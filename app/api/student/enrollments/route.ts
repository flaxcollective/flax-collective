import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, enrollments: [] }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const db = await getDb();
    const currentUser = await db.collection("users").findOne({ id: decoded.id });

    if (!currentUser) {
      return NextResponse.json({ success: false, enrollments: [] }, { status: 404 });
    }

    // Find all completed enrollments matching the user's email
    const enrollments = await db.collection("enrollments").find({
      email: currentUser.email,
      status: "completed"
    }).toArray();

    // Map each enrollment to fetch its course details
    const resolvedEnrollments = await Promise.all(
      enrollments.map(async (e) => {
        const courseDetails = await db.collection("courses").findOne({ title: e.course });
        return {
          id: e._id.toString(),
          courseId: e.courseId || courseDetails?.courseId || "",
          courseName: e.course,
          amount: e.amount,
          submittedAt: e.submittedAt,
          courseImage: courseDetails?.image || "",
          courseDesc: courseDetails?.desc || "",
          courseCategory: courseDetails?.category || "General",
          courseDuration: courseDetails?.duration || "Self-Paced"
        };
      })
    );

    return NextResponse.json({
      success: true,
      enrollments: resolvedEnrollments
    });
  } catch (err: any) {
    console.error("[STUDENT ENROLLMENTS GET ERROR]", err);
    return NextResponse.json({ success: false, enrollments: [] }, { status: 500 });
  }
}
