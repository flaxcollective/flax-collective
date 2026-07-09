import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { seedExamsIfEmpty } from "@/lib/exam_seed";

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

// GET all exams
export async function GET(req: NextRequest) {
  const auth = await checkAdminAuth();
  if (auth.error || !auth.db) {
    return NextResponse.json({ success: false, message: auth.error || "Unauthorized" }, { status: auth.status || 401 });
  }

  try {
    const db = auth.db;
    await seedExamsIfEmpty();
    const exams = await db.collection("exams").find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ success: true, exams });
  } catch (error: any) {
    console.error("GET Admin Exams Error:", error);
    return NextResponse.json({ success: false, message: "Error fetching exams" }, { status: 500 });
  }
}

// POST create exam
export async function POST(req: NextRequest) {
  const auth = await checkAdminAuth();
  if (auth.error || !auth.db) {
    return NextResponse.json({ success: false, message: auth.error || "Unauthorized" }, { status: auth.status || 401 });
  }

  try {
    const db = auth.db;
    const body = await req.json();
    const { examId, title, desc, fullDesc, price, discountedPrice, duration, passingMarks, totalQuestions, isActive } = body;

    if (!examId || !title || !desc || !duration || !passingMarks || !totalQuestions) {
      return NextResponse.json({ success: false, message: "Required fields are missing." }, { status: 400 });
    }

    const cleanExamId = examId.toUpperCase().trim();
    
    // Check uniqueness
    const existing = await db.collection("exams").findOne({ examId: cleanExamId });
    if (existing) {
      return NextResponse.json({ success: false, message: "Exam ID already exists." }, { status: 400 });
    }

    const newExam = {
      examId: cleanExamId,
      title: title.trim(),
      desc: desc.trim(),
      fullDesc: (fullDesc || desc).trim(),
      price: price ? price.toString().trim() : "0",
      discountedPrice: discountedPrice ? discountedPrice.toString().trim() : "0",
      duration: parseInt(duration, 10) || 60,
      passingMarks: parseInt(passingMarks, 10) || 80,
      totalQuestions: parseInt(totalQuestions, 10) || 20,
      isActive: isActive !== false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await db.collection("exams").insertOne(newExam);

    return NextResponse.json({
      success: true,
      message: "Exam created successfully.",
      exam: newExam
    });

  } catch (error: any) {
    console.error("POST Admin Exam Error:", error);
    return NextResponse.json({ success: false, message: "Error creating exam" }, { status: 500 });
  }
}

// PUT edit exam
export async function PUT(req: NextRequest) {
  const auth = await checkAdminAuth();
  if (auth.error || !auth.db) {
    return NextResponse.json({ success: false, message: auth.error || "Unauthorized" }, { status: auth.status || 401 });
  }

  try {
    const db = auth.db;
    const body = await req.json();
    const { examId, title, desc, fullDesc, price, discountedPrice, duration, passingMarks, totalQuestions, isActive } = body;

    if (!examId || !title || !desc || !duration || !passingMarks || !totalQuestions) {
      return NextResponse.json({ success: false, message: "Required fields are missing." }, { status: 400 });
    }

    const cleanExamId = examId.toUpperCase().trim();
    const existing = await db.collection("exams").findOne({ examId: cleanExamId });
    if (!existing) {
      return NextResponse.json({ success: false, message: "Exam not found." }, { status: 404 });
    }

    const updateFields = {
      title: title.trim(),
      desc: desc.trim(),
      fullDesc: (fullDesc || desc).trim(),
      price: price ? price.toString().trim() : "0",
      discountedPrice: discountedPrice ? discountedPrice.toString().trim() : "0",
      duration: parseInt(duration, 10) || 60,
      passingMarks: parseInt(passingMarks, 10) || 80,
      totalQuestions: parseInt(totalQuestions, 10) || 20,
      isActive: isActive !== false,
      updatedAt: new Date()
    };

    await db.collection("exams").updateOne(
      { examId: cleanExamId },
      { $set: updateFields }
    );

    return NextResponse.json({
      success: true,
      message: "Exam updated successfully.",
      exam: { ...existing, ...updateFields }
    });

  } catch (error: any) {
    console.error("PUT Admin Exam Error:", error);
    return NextResponse.json({ success: false, message: "Error updating exam" }, { status: 500 });
  }
}

// DELETE exam (cascades to questions)
export async function DELETE(req: NextRequest) {
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
    const result = await db.collection("exams").deleteOne({ examId: cleanExamId });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Exam not found." }, { status: 404 });
    }

    // Cascade delete questions
    await db.collection("exam_questions").deleteMany({ examId: cleanExamId });

    return NextResponse.json({
      success: true,
      message: "Exam and its associated questions deleted successfully."
    });

  } catch (error: any) {
    console.error("DELETE Admin Exam Error:", error);
    return NextResponse.json({ success: false, message: "Error deleting exam" }, { status: 500 });
  }
}
