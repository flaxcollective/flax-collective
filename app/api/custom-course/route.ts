import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";

function getTokenFromCookie(req: Request): string | null {
  const cookie = req.headers.get("cookie") || "";
  return (
    cookie
      .split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1] ?? null
  );
}

export async function GET(req: Request) {
  try {
    const token = getTokenFromCookie(req);

    if (!token) {
      return NextResponse.json({ courses: [] }, { status: 401 });
    }

    let user: any;
    try {
      user = jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      return NextResponse.json({ courses: [] }, { status: 401 });
    }

    const db = await getDb();
    const record = await db.collection("customCourses").findOne({ userId: user.id });

    return NextResponse.json({
      courses: record?.courses || [],
    });
  } catch (error) {
    console.error("GET ERROR:", error);
    return NextResponse.json({ courses: [] }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const token = getTokenFromCookie(req);

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

    const db = await getDb();
    await db.collection("customCourses").updateOne(
      { userId: user.id },
      {
        $set: {
          userId: user.id,
          email: user.email,
          courses,
          updatedAt: new Date().toISOString(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST ERROR:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}