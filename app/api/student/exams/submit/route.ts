import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getDb, getNextSequence } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const runtime = "nodejs";

// Helper to format duration
function formatDuration(startedAt: Date | string, submittedAt: Date): string {
  const start = new Date(startedAt).getTime();
  const end = submittedAt.getTime();
  const diffSecs = Math.max(0, Math.floor((end - start) / 1000));
  
  const hours = Math.floor(diffSecs / 3600);
  const minutes = Math.floor((diffSecs % 3600) / 60);
  const seconds = diffSecs % 60;
  
  return [hours, minutes, seconds]
    .map(v => v.toString().padStart(2, "0"))
    .join(":");
}

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
    const { sessionId } = body;

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
      return NextResponse.json({ success: false, message: "Exam session already submitted" }, { status: 400 });
    }

    const exam = await db.collection("exams").findOne({ examId: session.examId });
    if (!exam) {
      return NextResponse.json({ success: false, message: "Parent exam details not found" }, { status: 404 });
    }

    const questions = session.questions || [];
    const answers = session.answers || {};
    let correctCount = 0;

    // Grade exam
    questions.forEach((q: any, idx: number) => {
      const studentAnswer = answers[idx.toString()];
      if (studentAnswer && studentAnswer.toUpperCase() === q.correctOption.toUpperCase()) {
        correctCount++;
      }
    });

    const totalCount = questions.length;
    const score = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
    const passingMarks = exam.passingMarks || 80;
    const passed = score >= passingMarks;

    const submittedAt = new Date();
    const timeTaken = formatDuration(session.startedAt, submittedAt);

    let certificateId = "";
    if (passed) {
      // Generate professional sequential certificate ID, e.g. DLC-2026-000101
      try {
        const seq = await getNextSequence(`cert_${exam.examId.toLowerCase()}`);
        const year = submittedAt.getFullYear();
        const paddedSeq = seq.toString().padStart(6, "0");
        certificateId = `${exam.examId}-${year}-${paddedSeq}`;
      } catch (seqError) {
        console.error("Failed to generate sequence, fallback to timestamp", seqError);
        certificateId = `${exam.examId}-${Date.now().toString().substring(7)}`;
      }
    }

    // Save final details
    const updatedFields: any = {
      status: "submitted",
      submittedAt,
      score,
      correctCount,
      totalCount,
      passed,
      timeTaken
    };

    if (certificateId) {
      updatedFields.certificateId = certificateId;
    }

    await db.collection("exam_sessions").updateOne(filter, { $set: updatedFields });

    // Optional: Send success email to student
    if (passed) {
      try {
        const mailUser = process.env.MAIL_USER?.trim();
        const mailPass = process.env.MAIL_PASS?.replace(/"/g, "").trim();

        if (mailUser && mailPass) {
          const nodemailer = require("nodemailer");
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: { user: mailUser, pass: mailPass },
          });

          const name = currentUser.name || "Student";
          const mailOptions = {
            from: `"FLAX Collective" <${mailUser}>`,
            to: currentUser.email,
            subject: `Congratulations! Passed Certification: ${exam.title}`,
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px; max-width: 500px; margin: auto;">
                <h2 style="color: #6E7C3A; text-align: center;">Certification Passed!</h2>
                <p style="font-size: 16px; color: #333;">Dear <strong>${name}</strong>,</p>
                <p style="font-size: 16px; color: #555;">Congratulations on successfully passing the <strong>${exam.title}</strong> exam!</p>
                <div style="background-color: #f7f9f6; border: 1px solid #e1e8dc; padding: 15px; border-radius: 5px; margin: 20px 0;">
                  <p style="margin: 5px 0;"><strong>Score:</strong> ${score}% (Passed)</p>
                  <p style="margin: 5px 0;"><strong>Correct Answers:</strong> ${correctCount} / ${totalCount}</p>
                  <p style="margin: 5px 0;"><strong>Date:</strong> ${submittedAt.toLocaleDateString("en-GB")}</p>
                  <p style="margin: 5px 0;"><strong>Certificate ID:</strong> ${certificateId}</p>
                </div>
                <p style="font-size: 16px; color: #555;">You can download your certificate directly from your student dashboard under My Learning.</p>
                <p style="font-size: 14px; color: #999; text-align: center; margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px;">Best regards,<br/><strong>FLAX Collective Team</strong></p>
              </div>
            `
          };
          await transporter.sendMail(mailOptions);
          console.log("[SUBMIT EXAM] Sent success email.");
        }
      } catch (mailErr) {
        console.error("[SUBMIT EXAM EMAIL ERROR]", mailErr);
      }

      // Sync to Google Sheet
      const googleSheetUrl = process.env.GOOGLE_SHEET_WEBAPP_URL;
      if (googleSheetUrl) {
        try {
          await fetch(googleSheetUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              submittedAt,
              firstName: currentUser.name ? currentUser.name.split(" ")[0] : "Student",
              lastName: currentUser.name ? currentUser.name.split(" ").slice(1).join(" ") : "",
              email: currentUser.email,
              course: exam.title,
              score: `${score}%`,
              passed: "Yes",
              certificateId,
              sheetName: "Certifications",
            }),
          });
        } catch (sheetErr) {
          console.error("[SUBMIT EXAM SHEET SYNC ERROR]", sheetErr);
        }
      }
    }

    return NextResponse.json({
      success: true,
      results: {
        sessionId: session._id.toString(),
        examId: session.examId,
        title: exam.title,
        score,
        correctCount,
        totalCount,
        passed,
        timeTaken,
        submittedAt,
        certificateId
      }
    });

  } catch (error) {
    console.error("[SUBMIT EXAM ERROR]", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
