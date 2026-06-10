import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { promises as fs } from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const filePath = path.join(dataDir, "customCourses.json");

async function ensureFile() {
  try {
    await fs.access(filePath);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(filePath, "[]");
  }
}


export async function GET(req: Request) {
  try {
    await ensureFile();

    const cookie = req.headers.get("cookie") || "";
    const token = cookie
      .split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ courses: [] }, { status: 401 });
    }

    let user: any;
    try {
      user = jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      return NextResponse.json({ courses: [] }, { status: 401 });
    }

    const fileData = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileData);

    const userData = data.find((d: any) => d.userId === user.id);

    return NextResponse.json({
      courses: userData?.courses || [],
    });

  } catch (error) {
    console.error("GET ERROR:", error);
    return NextResponse.json({ courses: [] }, { status: 500 });
  }
}



export async function POST(req: Request) {
  try {
    await ensureFile();

    const cookie = req.headers.get("cookie") || "";
    const token = cookie
      .split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    let user: any;
    try {
      user = jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const body = await req.json();
    const { courses } = body;

    const fileData = await fs.readFile(filePath, "utf8");
    let data = JSON.parse(fileData);

    const index = data.findIndex((d: any) => d.userId === user.id);

    const entry = {
      userId: user.id,
      email: user.email,
      courses,
      updatedAt: new Date().toISOString(),
    };

    if (index !== -1) {
      data[index] = entry;
    } else {
      data.push(entry);
    }

    await fs.writeFile(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("POST ERROR:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}