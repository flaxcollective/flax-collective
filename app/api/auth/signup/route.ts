import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, phone, countryCode, city, usertype } = body;

    if (!name || !email || !password || !phone || !city) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    if (!/[a-zA-Z]/.test(city)) {
      return NextResponse.json(
        { success: false, message: "City name must contain letters" },
        { status: 400 }
      );
    }

    const allowedTypes = ["employee", "student"];
    if (!usertype || !allowedTypes.includes(usertype.toLowerCase())) {
      return NextResponse.json(
        { success: false, message: "User type must be either 'employee' or 'student'" },
        { status: 400 }
      );
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    if (!/[A-Z]/.test(password)) {
      return NextResponse.json(
        { success: false, message: "Password must contain at least one capital letter (A-Z)" },
        { status: 400 }
      );
    }
     if (!/[a-z]/.test(password)) {
      return NextResponse.json(
        { success: false, message: "Password must contain at least one Small letter (a-z)" },
        { status: 400 }
      );
    }

    if (!/[0-9]/.test(password)) {
      return NextResponse.json(
        { success: false, message: "Password must contain at least one number (0-9)" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const users = db.collection("users");

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await users.findOne({ email: normalizedEmail });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already registered" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const now = new Date().toISOString();
    
    // Default to +91 if countryCode is missing
    const finalCountryCode = countryCode || "+91";
    const fullPhone = `${finalCountryCode}${phone.replace(/\s+/g, "")}`;

    const newUser = {
      id: Date.now().toString(),
      name: name.trim(),
      email: normalizedEmail,
      phone: fullPhone,
      city: city.trim(),
      usertype: usertype.toLowerCase(),
      password: hashedPassword,
      createdAt: now,
      updatedAt: now,
    };

    await users.insertOne(newUser);

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        city: newUser.city,
        usertype: newUser.usertype,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    });
  } catch (error: any) {
    console.error("Signup Error", error);
    return NextResponse.json(
      { success: false, message: "Internal server error: " + (error.message || "Unknown Error") },
      { status: 500 }
    );
  }
}