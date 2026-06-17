import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";

export async function POST(req: Request) {
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

    const body = await req.json();
    const {
      name,
      phone,
      city,
      dob,
      gender,
      alternativePhone,
      address,
      currentPassword,
      newPassword,
      picture,
    } = body;

    const db = await getDb();
    const users = db.collection("users");
    const user = await users.findOne({ id: decoded.id });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    const updateFields: any = {
      updatedAt: new Date().toISOString(),
    };

    if (name !== undefined) updateFields.name = name.trim();
    if (phone !== undefined) updateFields.phone = phone.trim();
    if (city !== undefined) updateFields.city = city.trim();
    if (dob !== undefined) updateFields.dob = dob;
    if (gender !== undefined) updateFields.gender = gender;
    if (alternativePhone !== undefined) updateFields.alternativePhone = alternativePhone.trim();
    if (address !== undefined) updateFields.address = address.trim();
    if (picture !== undefined) updateFields.picture = picture;

    // Password Update Flow
    if (newPassword) {
      // Validation (matching signup requirements)
      if (newPassword.length < 6) {
        return NextResponse.json(
          { success: false, message: "New password must be at least 6 characters long" },
          { status: 400 }
        );
      }
      if (!/[A-Z]/.test(newPassword)) {
        return NextResponse.json(
          { success: false, message: "New password must contain at least one capital letter (A-Z)" },
          { status: 400 }
        );
      }
      if (!/[a-z]/.test(newPassword)) {
        return NextResponse.json(
          { success: false, message: "New password must contain at least one small letter (a-z)" },
          { status: 400 }
        );
      }
      if (!/[0-9]/.test(newPassword)) {
        return NextResponse.json(
          { success: false, message: "New password must contain at least one number (0-9)" },
          { status: 400 }
        );
      }

      // If they already have a password set, we MUST verify the current password first
      if (user.password) {
        if (!currentPassword) {
          return NextResponse.json(
            { success: false, message: "Current password is required to change password." },
            { status: 400 }
          );
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
          return NextResponse.json(
            { success: false, message: "Incorrect current password." },
            { status: 401 }
          );
        }
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      updateFields.password = hashedPassword;
    }

    await users.updateOne({ id: decoded.id }, { $set: updateFields });

    // Retrieve updated user details (excluding password)
    const updatedUser = await users.findOne({ id: decoded.id });
    const { password: _, ...userWithoutPassword } = updatedUser!;

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        ...userWithoutPassword,
        hasPassword: !!updatedUser!.password,
      },
    });
  } catch (error: any) {
    console.error("Profile API Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error: " + (error.message || "Unknown error") },
      { status: 500 }
    );
  }
}
