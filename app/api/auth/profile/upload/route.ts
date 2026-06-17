import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getDb } from "@/lib/mongodb";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Please log in again." },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file provided" },
        { status: 400 }
      );
    }

    // Limit to 5MB
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: "File size must be less than 5MB" },
        { status: 400 }
      );
    }

    // Allowed image formats
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: "Only image files (JPEG, PNG, WEBP, GIF) are allowed" },
        { status: 400 }
      );
    }

    // Convert file to array buffer and then node Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const fileExtension = file.name.split(".").pop();
    const filename = `avatar-${decoded.id}-${Date.now()}.${fileExtension}`;

    // Define public upload directory path inside avatars subfolder
    const uploadDir = path.join(process.cwd(), "public", "uploads", "avatars");

    // Ensure uploads directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // File target location path
    const filePath = path.join(uploadDir, filename);

    // Write file to local disk directory
    await fs.writeFile(filePath, buffer);

    // Relative web URL path
    const pictureUrl = `/uploads/avatars/${filename}`;

    // Write path to database
    const db = await getDb();
    const users = db.collection("users");

    await users.updateOne(
      { id: decoded.id },
      { $set: { picture: pictureUrl, updatedAt: new Date().toISOString() } }
    );

    const updatedUser = await users.findOne({ id: decoded.id });
    const { password, ...userWithoutPassword } = updatedUser!;

    return NextResponse.json({
      success: true,
      message: "Profile picture uploaded successfully.",
      user: {
        ...userWithoutPassword,
        hasPassword: !!password,
      },
    });
  } catch (error: any) {
    console.error("Upload Route Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error: " + (error.message || "Unknown error") },
      { status: 500 }
    );
  }
}
