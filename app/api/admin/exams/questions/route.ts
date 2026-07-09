import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

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

// GET all questions for a specific exam
export async function GET(req: NextRequest) {
  const auth = await checkAdminAuth();
  if (auth.error || !auth.db) {
    return NextResponse.json({ success: false, message: auth.error || "Unauthorized" }, { status: auth.status || 401 });
  }

  try {
    const db = auth.db;
    const { searchParams } = new URL(req.url);
    const examId = searchParams.get("examId");

    if (!examId) {
      return NextResponse.json({ success: false, message: "Exam ID is required." }, { status: 400 });
    }

    const cleanExamId = examId.toUpperCase().trim();
    const questions = await db.collection("exam_questions").find({ examId: cleanExamId }).toArray();
    
    return NextResponse.json({ success: true, questions });
  } catch (error: any) {
    console.error("GET Admin Questions Error:", error);
    return NextResponse.json({ success: false, message: "Error fetching questions" }, { status: 500 });
  }
}

// POST create question
export async function POST(req: NextRequest) {
  const auth = await checkAdminAuth();
  if (auth.error || !auth.db) {
    return NextResponse.json({ success: false, message: auth.error || "Unauthorized" }, { status: auth.status || 401 });
  }

  try {
    const db = auth.db;
    const body = await req.json();
    const { examId, questionText, options, correctOption, explanation } = body;

    if (!examId || !questionText || !options || !correctOption) {
      return NextResponse.json({ success: false, message: "Required fields are missing." }, { status: 400 });
    }

    if (!Array.isArray(options) || options.length !== 4) {
      return NextResponse.json({ success: false, message: "Options must be an array of exactly 4 strings." }, { status: 400 });
    }

    if (!["A", "B", "C", "D"].includes(correctOption.toUpperCase())) {
      return NextResponse.json({ success: false, message: "Correct option must be A, B, C, or D." }, { status: 400 });
    }

    const newQuestion = {
      examId: examId.toUpperCase().trim(),
      questionText: questionText.trim(),
      options: options.map(o => o.trim()),
      correctOption: correctOption.toUpperCase(),
      explanation: explanation ? explanation.trim() : "",
      createdAt: new Date()
    };

    const result = await db.collection("exam_questions").insertOne(newQuestion);

    return NextResponse.json({
      success: true,
      message: "Question added successfully.",
      question: {
        _id: result.insertedId.toString(),
        ...newQuestion
      }
    });

  } catch (error: any) {
    console.error("POST Admin Question Error:", error);
    return NextResponse.json({ success: false, message: "Error adding question" }, { status: 500 });
  }
}

// PUT edit question
export async function PUT(req: NextRequest) {
  const auth = await checkAdminAuth();
  if (auth.error || !auth.db) {
    return NextResponse.json({ success: false, message: auth.error || "Unauthorized" }, { status: auth.status || 401 });
  }

  try {
    const db = auth.db;
    const body = await req.json();
    const { id, questionText, options, correctOption, explanation } = body;

    if (!id || !questionText || !options || !correctOption) {
      return NextResponse.json({ success: false, message: "Required fields are missing." }, { status: 400 });
    }

    if (!Array.isArray(options) || options.length !== 4) {
      return NextResponse.json({ success: false, message: "Options must be an array of exactly 4 strings." }, { status: 400 });
    }

    if (!["A", "B", "C", "D"].includes(correctOption.toUpperCase())) {
      return NextResponse.json({ success: false, message: "Correct option must be A, B, C, or D." }, { status: 400 });
    }

    let filter: any = { _id: id };
    if (ObjectId.isValid(id)) {
      filter = { _id: new ObjectId(id) };
    }

    const existing = await db.collection("exam_questions").findOne(filter);
    if (!existing) {
      return NextResponse.json({ success: false, message: "Question not found." }, { status: 404 });
    }

    const updateFields = {
      questionText: questionText.trim(),
      options: options.map(o => o.trim()),
      correctOption: correctOption.toUpperCase(),
      explanation: explanation ? explanation.trim() : "",
      updatedAt: new Date()
    };

    await db.collection("exam_questions").updateOne(filter, { $set: updateFields });

    return NextResponse.json({
      success: true,
      message: "Question updated successfully.",
      question: { ...existing, ...updateFields }
    });

  } catch (error: any) {
    console.error("PUT Admin Question Error:", error);
    return NextResponse.json({ success: false, message: "Error updating question" }, { status: 500 });
  }
}

// DELETE question
export async function DELETE(req: NextRequest) {
  const auth = await checkAdminAuth();
  if (auth.error || !auth.db) {
    return NextResponse.json({ success: false, message: auth.error || "Unauthorized" }, { status: auth.status || 401 });
  }

  try {
    const db = auth.db;
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "Question ID is required." }, { status: 400 });
    }

    let filter: any = { _id: id };
    if (ObjectId.isValid(id)) {
      filter = { _id: new ObjectId(id) };
    }

    const result = await db.collection("exam_questions").deleteOne(filter);

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Question not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Question deleted successfully."
    });

  } catch (error: any) {
    console.error("DELETE Admin Question Error:", error);
    return NextResponse.json({ success: false, message: "Error deleting question" }, { status: 500 });
  }
}
