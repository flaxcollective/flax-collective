import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const certId = searchParams.get("certId");

    if (!certId) {
      return NextResponse.json({ success: false, message: "Certificate ID is required" }, { status: 400 });
    }

    const db = await getDb();
    
    // Find the exam session that matches the certificate ID and is successfully passed
    const session = await db.collection("exam_sessions").findOne({ 
      certificateId: certId,
      passed: true
    });

    if (!session) {
      return NextResponse.json({ success: false, message: "Invalid or unverified certificate ID" }, { status: 404 });
    }

    // Lookup the user to get their name
    const user = await db.collection("users").findOne({ email: session.email });
    const studentName = user?.name || user?.firstName + " " + user?.lastName || "Unknown Student";

    // Lookup the exam to get the title
    const exam = await db.collection("exams").findOne({ examId: session.examId });
    const examTitle = exam?.title || "Unknown Certification";

    return NextResponse.json({
      success: true,
      certificate: {
        certificateId: session.certificateId,
        studentName: studentName.trim(),
        examTitle,
        score: session.score,
        issueDate: session.submittedAt,
        enrollmentId: session.enrollmentId || session.orderId || "N/A"
      }
    });

  } catch (error) {
    console.error("[VERIFY CERTIFICATE ERROR]", error);
    return NextResponse.json({ success: false, message: "Server error during verification" }, { status: 500 });
  }
}
