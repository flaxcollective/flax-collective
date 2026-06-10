import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET!);

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Session Error:", error);

    return NextResponse.json({ user: null });
  }
}