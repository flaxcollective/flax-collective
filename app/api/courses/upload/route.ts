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
        { success: false, message: "Unauthorized: Please log in." },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const db = await getDb();
    const user = await db.collection("users").findOne({ id: decoded.id });

    if (!user || (user.usertype !== "admin" && user.usertype !== "employee")) {
      return NextResponse.json(
        { success: false, message: "Forbidden: Admin access required." },
        { status: 403 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file provided" },
        { status: 400 }
      );
    }

    // Limit size to 5MB
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
    const filename = `course-${Date.now()}.${fileExtension}`;

    // Define public upload directory path inside courses subfolder
    const uploadDir = path.join(process.cwd(), "public", "uploads", "courses");

    // Ensure uploads directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // File target location path
    const filePath = path.join(uploadDir, filename);

    // Write file to local disk directory
    await fs.writeFile(filePath, buffer);

    // Relative web URL path
    const imageUrl = `/uploads/courses/${filename}`;

    return NextResponse.json({
      success: true,
      message: "Image uploaded successfully.",
      imageUrl
    });
  } catch (error: any) {
    console.error("Course Image Upload Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error: " + (error.message || "Unknown error") },
      { status: 500 }
    );
  }
}
