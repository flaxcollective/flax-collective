import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "employers.json");
const GOOGLE_SHEET_URL = process.env.GOOGLE_SHEET_WEBAPP_URL;


export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, unknown>;
    let { fullName, companyName, email, countryCode, phone, jobRole, candidatesRequired, location, employmentType } = body;

    // Ensure countryCode has +
    if (typeof countryCode === 'string' && countryCode && !countryCode.startsWith('+')) {
      countryCode = '+' + countryCode;
    }

    if (!fullName || !companyName || !email || !countryCode || !phone || !jobRole || !candidatesRequired || !location || !employmentType) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    // Read existing data
    let entries: unknown[] = [];
    try {
      const raw = await fs.readFile(DATA_FILE, "utf-8");
      entries = JSON.parse(raw) as unknown[];
    } catch {
      entries = [];
    }

    // Append new entry
    const newEntry = {
      id: Date.now(),
      submittedAt: new Date().toISOString(),
      fullName,
      companyName,
      email,
      countryCode,
      phone,
      jobRole,
      candidatesRequired,
      location,
      employmentType,
    };

    entries.push(newEntry);

    // Ensure /data folder exists
    await fs.mkdir(path.join(process.cwd(), "data"), { recursive: true });

    // Write back to file
    await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2), "utf-8");

    if (GOOGLE_SHEET_URL) {
      try {
        await fetch(GOOGLE_SHEET_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...newEntry,
            countryCode: `'${newEntry.countryCode}`, // Prefix with ' to preserve + in Google Sheets
            sheetName: "EmployerSubmissions"
          }),
        });
      } catch (sheetErr) {
        console.error("[GOOGLE SHEETS ERROR]", sheetErr);
      }
    } else {
      console.warn("[GOOGLE SHEETS] No URL configured in .env.local");
    }
    return NextResponse.json({ success: true, message: "Hiring request submitted successfully." });
  } catch (err) {
    console.error("[EMPLOYER ERROR]", err);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again." },
      { status: 500 }
    );
  }
}