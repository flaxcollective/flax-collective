import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "employers.json");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, unknown>;
    const { fullName, companyName, email, phone, jobRole, candidatesRequired, location, employmentType } = body;

    if (!fullName || !companyName || !email || !phone || !jobRole || !candidatesRequired || !location || !employmentType) {
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

    console.log("[EMPLOYER SAVED]", newEntry);

    return NextResponse.json({ success: true, message: "Hiring request submitted successfully." });
  } catch (err) {
    console.error("[EMPLOYER ERROR]", err);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again." },
      { status: 500 }
    );
  }
}