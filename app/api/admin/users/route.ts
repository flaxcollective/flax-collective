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
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "6", 10);
    const search = searchParams.get("search") || "";
    const roleFilter = searchParams.get("role") || "All";

    const usersCol = db.collection("users");
    const coursesCol = db.collection("courses");
    const enrollmentsCol = db.collection("enrollments");

    // Build filter query
    const filterQuery: any = {};
    if (search) {
      filterQuery.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ];
    }

    if (roleFilter !== "All") {
      if (roleFilter.toLowerCase() === "member") {
        filterQuery.usertype = "student";
      } else {
        filterQuery.usertype = roleFilter.toLowerCase();
      }
    }

    // Pagination values
    const skip = (page - 1) * limit;
    const totalMatching = await usersCol.countDocuments(filterQuery);
    const users = await usersCol.find(filterQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Map database roles to friendly display roles (e.g. usertype: "student" -> "Member")
    const formattedUsers = users.map(user => ({
      id: user.id || user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.usertype === "student" ? "Member" : (user.usertype === "employee" ? "Employee" : "Admin"),
      status: "Active", // Standard display status
      joinedOn: user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }) : "Recently",
      picture: user.picture || ""
    }));

    // Stats calculations
    const totalCourses = await coursesCol.countDocuments({});
    const totalUsers = await usersCol.countDocuments({});
    
    // Simulate active members and completions based on real DB counts + stable offsets to match the UI screenshot scale
    const activeMembers = await usersCol.countDocuments({ usertype: "student" });
    const completedCount = await enrollmentsCol.countDocuments({ status: "completed" });
    
    const displayTotalCourses = totalCourses;
    const displayTotalUsers = totalUsers;
    const displayActiveMembers = activeMembers;
    const displayCompletions = completedCount;

    return NextResponse.json({
      success: true,
      users: formattedUsers,
      totalCount: totalMatching,
      currentPage: page,
      totalPages: Math.ceil(totalMatching / limit),
      stats: {
        totalCourses: displayTotalCourses,
        totalUsers: displayTotalUsers,
        activeMembers: displayActiveMembers,
        completions: displayCompletions
      }
    });
  } catch (error: any) {
    console.error("Admin Users Error:", error);
    return NextResponse.json(
      { success: false, message: "Error loading user lists" },
      { status: 500 }
    );
  }
}
