import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";

const GOOGLE_SHEET_URL = process.env.GOOGLE_SHEET_WEBAPP_URL;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, unknown>;
    let { firstName, lastName, email, countryCode, mobile, country, state, city, course } = body;

    // Ensure countryCode has +
    if (typeof countryCode === "string" && countryCode && !countryCode.startsWith("+")) {
      countryCode = "+" + countryCode;
    }

    if (!firstName || !lastName || !email || !countryCode || !mobile || !country || !state || !city || !course) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    if (typeof city === "string" && !/[a-zA-Z]/.test(city)) {
      return NextResponse.json(
        { success: false, message: "City name must contain letters." },
        { status: 400 }
      );
    }

    const newEntry = {
      submittedAt: new Date(),
      firstName,
      lastName,
      email,
      countryCode,
      mobile,
      country,
      state,
      city,
      course,
    };

    const db = await getDb();
    await db.collection("enrollments").insertOne(newEntry);

    if (GOOGLE_SHEET_URL) {
      try {
        await fetch(GOOGLE_SHEET_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...newEntry,
            countryCode: `'${countryCode}`,
            sheetName: "StudentSubmissions",
          }),
        });
      } catch (sheetErr) {
        console.error("[GOOGLE SHEETS ERROR]", sheetErr);
      }
    }

    return NextResponse.json({ success: true, message: "Enrollment submitted successfully." });
  } catch (err) {
    console.error("[ENROLLMENT ERROR]", err);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again." },
      { status: 500 }
    );
  }
}