import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";

const GOOGLE_SHEET_URL = process.env.GOOGLE_SHEET_WEBAPP_URL;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, unknown>;
    let { name, countryCode, mobile, email, message } = body;

    // Ensure countryCode has +
    if (typeof countryCode === "string" && countryCode && !countryCode.startsWith("+")) {
      countryCode = "+" + countryCode;
    }

    if (!name || !countryCode || !mobile || !email || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    const newEntry = {
      submittedAt: new Date(),
      name,
      countryCode,
      mobile,
      email,
      message,
    };

    const db = await getDb();
    await db.collection("contacts").insertOne(newEntry);

    // Send to Google Sheets
    if (GOOGLE_SHEET_URL) {
      try {
        await fetch(GOOGLE_SHEET_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...newEntry,
            countryCode: `'${countryCode}`,
            sheetName: "ContactSubmissions",
          }),
        });
      } catch (sheetErr) {
        console.error("[GOOGLE SHEETS ERROR]", sheetErr);
      }
    }

    return NextResponse.json({ success: true, message: "Message sent successfully." });
  } catch (err) {
    console.error("[CONTACT ERROR]", err);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
