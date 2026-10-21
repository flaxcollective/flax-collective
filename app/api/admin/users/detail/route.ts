import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
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
    const currentUser = await db.collection("users").findOne({ id: decoded.id });

    if (!currentUser || (currentUser.usertype !== "admin" && currentUser.usertype !== "employee")) {
      return NextResponse.json(
        { success: false, message: "Forbidden: Admin access required." },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Missing userId parameter" },
        { status: 400 }
      );
    }

    const user = await db.collection("users").findOne({ id: userId });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Return everything except password
    const { password, ...safeUser } = user;

    // Fetch enrollments by email (case-insensitive)
    const emailEscaped = (user.email || "").replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    const enrollments = await db.collection("enrollments").find({
      email: { $regex: new RegExp(`^${emailEscaped}$`, "i") }
    }).sort({ submittedAt: -1 }).toArray();

    // Fall back to enrollment contact details if user document has missing fields
    const latestEnrollment = enrollments[0];
    if (latestEnrollment) {
      if (!safeUser.phone && latestEnrollment.mobile) safeUser.phone = latestEnrollment.mobile;
      if (!safeUser.countryCode && latestEnrollment.countryCode) safeUser.countryCode = latestEnrollment.countryCode;
      if (!safeUser.country && latestEnrollment.country) safeUser.country = latestEnrollment.country;
      if (!safeUser.state && latestEnrollment.state) safeUser.state = latestEnrollment.state;
      if (!safeUser.city && latestEnrollment.city) safeUser.city = latestEnrollment.city;
    }

    return NextResponse.json({
      success: true,
      user: safeUser,
      enrollments: enrollments.map(e => ({
        id: e._id.toString(),
        course: e.course,
        courseId: e.courseId,
        amount: e.amount,
        status: e.status,
        submittedAt: e.submittedAt
      }))
    });
  } catch (error: any) {
    console.error("GET User Detail Error:", error);
    return NextResponse.json(
      { success: false, message: "Error loading user details" },
      { status: 500 }
    );
  }
}
