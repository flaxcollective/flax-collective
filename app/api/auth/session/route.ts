import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    const db = await getDb();
    const user = await db.collection("users").findOne({ id: decoded.id });

    if (!user) {
      return NextResponse.json({ user: null });
    }

    const { password, ...userWithoutPassword } = user;

    return NextResponse.json({
      user: {
        ...userWithoutPassword,
        hasPassword: !!password,
      },
    });
  } catch (error) {
    console.error("Session Error:", error);

    return NextResponse.json({ user: null });
  }
}