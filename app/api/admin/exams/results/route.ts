import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";

// Helper to check admin/employee permission
async function checkAdminAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { error: "Unauthorized: Please log in.", status: 401 };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const db = await getDb();
    const currentUser = await db.collection("users").findOne({ id: decoded.id });

    if (!currentUser || (currentUser.usertype !== "admin" && currentUser.usertype !== "employee")) {
      return { error: "Forbidden: Admin access required.", status: 403 };
    }

    return { db, user: currentUser };
  } catch (err) {
    return { error: "Session expired or invalid.", status: 401 };
  }
}

export async function GET(req: NextRequest) {
  const auth = await checkAdminAuth();
  if (auth.error || !auth.db) {
    return NextResponse.json({ success: false, message: auth.error || "Unauthorized" }, { status: auth.status || 401 });
  }

  try {
    const db = auth.db;
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "8", 10);
    const search = searchParams.get("search") || "";
    const examFilter = searchParams.get("examId") || "All";
    const statusFilter = searchParams.get("status") || "All"; // Pass, Fail, All

    const query: any = { status: "submitted" }; // Only check submitted ones

    if (examFilter !== "All") {
      query.examId = examFilter;
    }

    if (statusFilter === "Pass") {
      query.passed = true;
    } else if (statusFilter === "Fail") {
      query.passed = false;
    }

    // Resolve search by matching user names or emails
    if (search) {
      const usersMatching = await db.collection("users").find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } }
        ]
      }).toArray();
      const matchingEmails = usersMatching.map(u => u.email);
      
      query.$or = [
        { email: { $regex: search, $options: "i" } },
        { email: { $in: matchingEmails } }
      ];
    }

    const skip = (page - 1) * limit;
    const totalCount = await db.collection("exam_sessions").countDocuments(query);
    const sessions = await db.collection("exam_sessions").find(query)
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Map sessions to include candidate details and exam details
    const resolvedSessions = await Promise.all(
      sessions.map(async (s) => {
        const student = await db.collection("users").findOne({ email: s.email });
        const exam = await db.collection("exams").findOne({ examId: s.examId });

        return {
          sessionId: s._id.toString(),
          examId: s.examId,
          examTitle: exam?.title || "Unknown Certification",
          email: s.email,
          studentName: student?.name || "Unknown Candidate",
          score: s.score,
          correctCount: s.correctCount,
          totalCount: s.totalCount,
          passed: s.passed,
          submittedAt: s.submittedAt,
          timeTaken: s.timeTaken,
          certificateId: s.certificateId || ""
        };
      })
    );

    return NextResponse.json({
      success: true,
      results: resolvedSessions,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit)
    });

  } catch (error: any) {
    console.error("GET Admin Exam Results Error:", error);
    return NextResponse.json({ success: false, message: "Error loading results" }, { status: 500 });
  }
}
