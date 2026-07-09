import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getDb } from "@/lib/mongodb";
import { seedExamsIfEmpty } from "@/lib/exam_seed";

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

    // Auto-seed if database collections are empty
    await seedExamsIfEmpty();

    // Fetch active exams
    const exams = await db.collection("exams").find({ isActive: true }).toArray();

    // Fetch user enrollments (for type: "exam") and exam sessions
    const enrollments = await db.collection("enrollments").find({
      email: currentUser.email,
      status: "completed",
      type: "exam"
    }).toArray();

    const sessions = await db.collection("exam_sessions").find({
      email: currentUser.email
    }).toArray();

    // Map through exams and associate status
    const resolvedExams = exams.map((exam) => {
      const isPurchased = enrollments.some(e => e.courseId === exam.examId);
      const examSessions = sessions.filter(s => s.examId === exam.examId);
      
      // Check if they have passed
      const hasPassed = examSessions.some(s => s.status === "submitted" && s.passed === true);
      const lastSession = examSessions.sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())[0] || null;

      return {
        examId: exam.examId,
        title: exam.title,
        desc: exam.desc,
        fullDesc: exam.fullDesc,
        price: exam.price,
        discountedPrice: exam.discountedPrice,
        duration: exam.duration,
        passingMarks: exam.passingMarks,
        totalQuestions: exam.totalQuestions,
        isPurchased,
        hasPassed,
        lastSession: lastSession ? {
          sessionId: lastSession._id.toString(),
          status: lastSession.status,
          score: lastSession.score,
          passed: lastSession.passed,
          submittedAt: lastSession.submittedAt,
          certificateId: lastSession.certificateId
        } : null
      };
    });

    return NextResponse.json({
      success: true,
      exams: resolvedExams
    });
  } catch (error: any) {
    console.error("[STUDENT EXAMS GET ERROR]", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
