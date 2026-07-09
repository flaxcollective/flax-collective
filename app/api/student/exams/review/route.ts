import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const db = await getDb();
    const currentUser = await db.collection("users").findOne({ id: decoded.id });

    if (!currentUser) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json({ success: false, message: "Session ID required" }, { status: 400 });
    }

    let filter: any = { _id: sessionId };
    if (ObjectId.isValid(sessionId)) {
      filter = { _id: new ObjectId(sessionId) };
    }

    const session = await db.collection("exam_sessions").findOne(filter);
    if (!session) {
      return NextResponse.json({ success: false, message: "Session not found" }, { status: 404 });
    }

    // Admins and owners can review sessions
    const isAdmin = currentUser.usertype === "admin" || currentUser.usertype === "employee";
    if (session.email !== currentUser.email && !isAdmin) {
      return NextResponse.json({ success: false, message: "Unauthorized access to session" }, { status: 403 });
    }

    if (session.status !== "submitted") {
      return NextResponse.json({ success: false, message: "Session is not submitted yet" }, { status: 400 });
    }

    const exam = await db.collection("exams").findOne({ examId: session.examId });

    return NextResponse.json({
      success: true,
      review: {
        sessionId: session._id.toString(),
        examId: session.examId,
        examTitle: exam?.title || "Unknown Certification",
        score: session.score,
        correctCount: session.correctCount,
        totalCount: session.totalCount,
        timeTaken: session.timeTaken,
        submittedAt: session.submittedAt,
        passed: session.passed,
        certificateId: session.certificateId,
        questions: session.questions.map((q: any, idx: number) => ({
          questionText: q.questionText,
          options: q.options,
          correctOption: q.correctOption,
          explanation: q.explanation || "",
          studentAnswer: session.answers[idx.toString()] || null
        }))
      }
    });

  } catch (error) {
    console.error("[GET EXAM REVIEW ERROR]", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
