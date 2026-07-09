import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const runtime = "nodejs";

// Helper to check session expiry
function isSessionExpired(startedAt: Date | string, durationMinutes: number): boolean {
  const start = new Date(startedAt).getTime();
  const now = Date.now();
  return now - start > durationMinutes * 60 * 1000;
}

// GET active session
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
    const examId = searchParams.get("examId");

    if (!examId) {
      return NextResponse.json({ success: false, message: "Exam ID required" }, { status: 400 });
    }

    const exam = await db.collection("exams").findOne({ examId, isActive: true });
    if (!exam) {
      return NextResponse.json({ success: false, message: "Exam not found" }, { status: 404 });
    }

    // Find started session
    const session = await db.collection("exam_sessions").findOne({
      email: currentUser.email,
      examId,
      status: "started"
    });

    if (!session) {
      return NextResponse.json({ success: true, activeSession: null });
    }

    // Check if expired
    const duration = exam.duration || 60;
    if (isSessionExpired(session.startedAt, duration)) {
      // Auto-submit expired session
      await db.collection("exam_sessions").updateOne(
        { _id: session._id },
        { $set: { status: "submitted", submittedAt: new Date() } }
      );
      return NextResponse.json({ success: true, activeSession: null, message: "Session expired and submitted." });
    }

    // Hide answers on retrieve
    const clientQuestions = session.questions.map((q: any) => ({
      questionText: q.questionText,
      options: q.options
    }));

    const remainingSeconds = Math.max(0, Math.floor((new Date(session.startedAt).getTime() + duration * 60 * 1000 - Date.now()) / 1000));

    return NextResponse.json({
      success: true,
      activeSession: {
        sessionId: session._id.toString(),
        examId: session.examId,
        questions: clientQuestions,
        answers: session.answers || {},
        markedForReview: session.markedForReview || [],
        remainingSeconds
      }
    });

  } catch (error) {
    console.error("[GET EXAM SESSION ERROR]", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

// POST start session
export async function POST(req: NextRequest) {
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

    const body = await req.json();
    const { examId } = body;

    if (!examId) {
      return NextResponse.json({ success: false, message: "Exam ID required" }, { status: 400 });
    }

    const exam = await db.collection("exams").findOne({ examId, isActive: true });
    if (!exam) {
      return NextResponse.json({ success: false, message: "Exam not found or inactive" }, { status: 404 });
    }

    // Verify purchase
    const enrollment = await db.collection("enrollments").findOne({
      email: currentUser.email,
      courseId: examId,
      status: "completed",
      type: "exam"
    });

    if (!enrollment) {
      return NextResponse.json({ success: false, message: "You must purchase this exam certification first." }, { status: 403 });
    }

    // Check if there is an active session
    let existingSession = await db.collection("exam_sessions").findOne({
      email: currentUser.email,
      examId,
      status: "started"
    });

    const duration = exam.duration || 60;

    if (existingSession) {
      if (!isSessionExpired(existingSession.startedAt, duration)) {
        // Return existing active session to resume
        const clientQuestions = existingSession.questions.map((q: any) => ({
          questionText: q.questionText,
          options: q.options
        }));
        const remainingSeconds = Math.max(0, Math.floor((new Date(existingSession.startedAt).getTime() + duration * 60 * 1000 - Date.now()) / 1000));
        
        return NextResponse.json({
          success: true,
          sessionId: existingSession._id.toString(),
          questions: clientQuestions,
          answers: existingSession.answers || {},
          markedForReview: existingSession.markedForReview || [],
          remainingSeconds,
          isResumed: true
        });
      } else {
        // Submit expired session
        await db.collection("exam_sessions").updateOne(
          { _id: existingSession._id },
          { $set: { status: "submitted", submittedAt: new Date() } }
        );
      }
    }

    // Generate new session: Get all questions for this exam
    const questions = await db.collection("exam_questions").find({ examId }).toArray();
    if (questions.length === 0) {
      return NextResponse.json({ success: false, message: "No questions found for this exam." }, { status: 400 });
    }

    // Shuffle questions
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    // Take totalQuestions amount
    const totalToSelect = exam.totalQuestions || 20;
    const selectedQuestions = shuffled.slice(0, Math.min(totalToSelect, shuffled.length));

    const newSession = {
      email: currentUser.email,
      examId,
      questions: selectedQuestions,
      answers: {},
      markedForReview: [],
      status: "started",
      startedAt: new Date(),
    };

    const result = await db.collection("exam_sessions").insertOne(newSession);

    // Hide answers for client
    const clientQuestions = selectedQuestions.map((q) => ({
      questionText: q.questionText,
      options: q.options
    }));

    return NextResponse.json({
      success: true,
      sessionId: result.insertedId.toString(),
      questions: clientQuestions,
      answers: {},
      markedForReview: [],
      remainingSeconds: duration * 60,
      isResumed: false
    });

  } catch (error) {
    console.error("[POST START SESSION ERROR]", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

// PUT save progress
export async function PUT(req: NextRequest) {
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

    const body = await req.json();
    const { sessionId, answers, markedForReview } = body;

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

    if (session.email !== currentUser.email) {
      return NextResponse.json({ success: false, message: "Unauthorized session ownership" }, { status: 403 });
    }

    if (session.status !== "started") {
      return NextResponse.json({ success: false, message: "Session is already submitted" }, { status: 400 });
    }

    const exam = await db.collection("exams").findOne({ examId: session.examId });
    const duration = exam?.duration || 60;

    if (isSessionExpired(session.startedAt, duration)) {
      await db.collection("exam_sessions").updateOne(
        filter,
        { $set: { status: "submitted", submittedAt: new Date() } }
      );
      return NextResponse.json({ success: false, message: "Session expired and auto-submitted" }, { status: 400 });
    }

    // Save intermediate progress
    await db.collection("exam_sessions").updateOne(
      filter,
      {
        $set: {
          answers: answers || {},
          markedForReview: markedForReview || []
        }
      }
    );

    return NextResponse.json({ success: true, message: "Progress saved" });

  } catch (error) {
    console.error("[PUT SAVE PROGRESS ERROR]", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
