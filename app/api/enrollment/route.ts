import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "enrollments.json");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, unknown>;
    const { firstName, lastName, mobile, state, city, course } = body;

    if (!firstName || !lastName || !mobile || !state || !city || !course) {
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
      // File doesn't exist yet — start fresh
      entries = [];
    }

    // Append new entry
    const newEntry = {
      id: Date.now(),
      submittedAt: new Date().toISOString(),
      firstName,
      lastName,
      mobile,
      state,
      city,
      course,
    };

    entries.push(newEntry);

    // Ensure /data folder exists
    await fs.mkdir(path.join(process.cwd(), "data"), { recursive: true });

    // Write back to file
    await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2), "utf-8");

    console.log("[ENROLLMENT SAVED]", newEntry);

    return NextResponse.json({ success: true, message: "Enrollment submitted successfully." });
  } catch (err) {
    console.error("[ENROLLMENT ERROR]", err);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again." },
      { status: 500 }
    );
  }
}