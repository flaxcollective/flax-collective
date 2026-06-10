import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { promises as fs } from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const filePath = path.join(dataDir, "signup.json");


async function readUsers() {
  try {
    const fileData = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {

    return [];
  }
}


async function saveUsers(users: any[]) {
  await fs.writeFile(filePath, JSON.stringify(users, null, 2), "utf8");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, phone, city, usertype } = body;

  
    if (!name || !email || !password || !phone || !city) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
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


    const phoneRegex = /^(\+91[\s-]?)?[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        {
          success: false,
          message: "Phone number must be a valid Indian number. Accepted formats: 9876543210 or +919876543210"
        },
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

    if (!/[0-9]/.test(password)) {
      return NextResponse.json(
        { success: false, message: "Password must contain at least one number (0-9)" },
        { status: 400 }
      );
    }

  
    let users = await readUsers()
    const normalizedEmail = email.toLowerCase().trim();
   const existingUser = users.find((u: any) => 
      u.email.toLowerCase() === normalizedEmail
    );

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already registered" },
        { status: 409 }
      );
    }

    
    const hashedPassword = await bcrypt.hash(password, 12);

    const now = new Date().toISOString();

    const newUser = {
      id: Date.now().toString(),
      name: name.trim(),
      email: normalizedEmail,
      phone: phone.replace(/\s+/g, ""),
      city: city.trim(),
      usertype: usertype.toLowerCase(),
      password: hashedPassword,
      createdAt: now,
      updatedAt: now,
    };


    users.push(newUser);

    await saveUsers(users);

  
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

  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}