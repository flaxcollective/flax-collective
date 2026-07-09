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
      return NextResponse.json({ success: false, certificates: [] }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const db = await getDb();
    const currentUser = await db.collection("users").findOne({ id: decoded.id });

    if (!currentUser) {
      return NextResponse.json({ success: false, certificates: [] }, { status: 404 });
    }

    // Find all successfully passed submitted exam sessions
    const sessions = await db.collection("exam_sessions").find({
      email: currentUser.email,
      status: "submitted",
      passed: true
    }).sort({ submittedAt: -1 }).toArray();

    // Map through sessions and gather parent exam info
    const resolvedCertificates = await Promise.all(
      sessions.map(async (s) => {
        const exam = await db.collection("exams").findOne({ examId: s.examId });
        return {
          sessionId: s._id.toString(),
          examId: s.examId,
          examTitle: exam?.title || "Unknown Certification",
          examDesc: exam?.desc || "",
          score: s.score,
          correctCount: s.correctCount,
          totalCount: s.totalCount,
          timeTaken: s.timeTaken,
          submittedAt: s.submittedAt,
          certificateId: s.certificateId || ""
        };
      })
    );

    return NextResponse.json({
      success: true,
      certificates: resolvedCertificates
    });

  } catch (error) {
    console.error("[GET STUDENT CERTIFICATES ERROR]", error);
    return NextResponse.json({ success: false, certificates: [] }, { status: 500 });
  }
}
