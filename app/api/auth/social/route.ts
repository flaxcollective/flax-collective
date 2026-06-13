import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { provider, token, action, usertype } = body;

    if (!provider || !token) {
      return NextResponse.json({ success: false, message: "Provider and token required" }, { status: 400 });
    }

    let email = "";
    let name = "";
    let picture = "";

    if (provider === "google") {
      let googleData;
      let response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
      if (response.ok) {
        googleData = await response.json();
      } else {
        response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.ok) {
          googleData = await response.json();
        }
      }

      if (!googleData || !googleData.email) {
        return NextResponse.json({ success: false, message: "Invalid Google token" }, { status: 400 });
      }
      email = googleData.email;
      name = googleData.name;
      picture = googleData.picture;
    } else {
      return NextResponse.json({ success: false, message: "Unsupported provider" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const db = await getDb();
    const users = db.collection("users");
    let user = await users.findOne({ email: normalizedEmail });

    if (!user) {
      // Create user if not exists
      const now = new Date().toISOString();
      const newUser = {
        id: Date.now().toString(),
        name: (name || "User").trim(),
        email: normalizedEmail,
        usertype: usertype ? usertype.toLowerCase() : "student", // default to student if missing
        provider: provider,
        createdAt: now,
        updatedAt: now,
      };
      await users.insertOne(newUser as any);
      user = newUser as any;
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      {
        id: user!.id,
        email: user!.email,
        usertype: user!.usertype,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    const response = NextResponse.json({
      success: true,
      message: "Login Successful",
      token: jwtToken,
      user: {
        id: user!.id,
        name: user!.name,
        email: user!.email,
        usertype: user!.usertype,
      },
    });

    response.cookies.set("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error: any) {
    console.error("Social Auth Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error: " + (error.message || "Unknown Error"),
        stack: error.stack
      },
      { status: 500 }
    );
  }
}
