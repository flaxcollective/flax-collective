import { getDb } from "../mongodb";
import { sendEnrollmentSuccessEmail, sendExamEnrollmentSuccessEmail } from "../mailer";
import { ObjectId } from "mongodb";

export async function completeEnrollment(enrollmentId: string, pgTxnId?: string) {
  const db = await getDb();
  console.log(`[SERVICE] completeEnrollment invoked for enrollmentId: ${enrollmentId}, pgTxnId: ${pgTxnId}`);

  // Find enrollment by ID (try both string and ObjectId)
  let enrollmentFilter: any = { _id: enrollmentId };
  if (ObjectId.isValid(enrollmentId)) {
    enrollmentFilter = {
      $or: [
        { _id: enrollmentId },
        { _id: new ObjectId(enrollmentId) }
      ]
    };
  }

  const enrollment = await db.collection("enrollments").findOne(enrollmentFilter);
  if (!enrollment) {
    console.error(`[SERVICE] Enrollment with ID ${enrollmentId} not found.`);
    return false;
  }

  if (enrollment.status === "completed") {
    console.log(`[SERVICE] Enrollment ${enrollmentId} is already completed.`);
    return true;
  }

  // Update status to completed in db
  await db.collection("enrollments").updateOne(
    enrollmentFilter,
    { $set: { status: "completed", pgTxnId: pgTxnId || "" } }
  );

  const studentName = `${enrollment.firstName} ${enrollment.lastName}`;
  
  // 1. Send confirmation email
  if (enrollment.type === "exam") {
    await sendExamEnrollmentSuccessEmail(enrollment.email, studentName, enrollment.course);
  } else {
    await sendEnrollmentSuccessEmail(enrollment.email, studentName, enrollment.course);
  }

  // 1.5 Update user profile if user exists with the details they provided during checkout
  try {
    await db.collection("users").updateOne(
      { email: enrollment.email },
      {
        $set: {
          name: studentName,
          phone: enrollment.mobile,
          countryCode: enrollment.countryCode,
          country: enrollment.country,
          state: enrollment.state,
          city: enrollment.city,
        }
      }
    );
    console.log(`[SERVICE] Updated user profile for ${enrollment.email}`);
  } catch (err) {
    console.error("[SERVICE] Error updating user profile:", err);
  }

  // 2. Sync to Google Sheets
  const googleSheetUrl = process.env.GOOGLE_SHEET_WEBAPP_URL;
  if (googleSheetUrl) {
    try {
      await fetch(googleSheetUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submittedAt: enrollment.submittedAt,
          firstName: enrollment.firstName,
          lastName: enrollment.lastName,
          email: enrollment.email,
          countryCode: `'${enrollment.countryCode}`,
          mobile: enrollment.mobile,
          country: enrollment.country,
          state: enrollment.state,
          city: enrollment.city,
          course: enrollment.course,
          sheetName: "StudentSubmissions",
        }),
      });
      console.log("[SERVICE] Google Sheet sync successful.");
    } catch (sheetErr) {
      console.error("[SERVICE] Google Sheet sync failed:", sheetErr);
    }
  } else {
    console.warn("[SERVICE] GOOGLE_SHEET_WEBAPP_URL is not configured.");
  }

  return true;
}
