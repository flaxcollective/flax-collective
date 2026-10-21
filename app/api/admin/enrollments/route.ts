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
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const search = searchParams.get("search") || "";
    const statusFilter = searchParams.get("status") || "All";
    const typeFilter = searchParams.get("type") || "All";

    const filterQuery: any = {};

    if (search) {
      filterQuery.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { mobile: { $regex: search, $options: "i" } },
        { course: { $regex: search, $options: "i" } },
        { merchantTxnNo: { $regex: search, $options: "i" } },
        { pgTxnId: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
        { country: { $regex: search, $options: "i" } },
        { state: { $regex: search, $options: "i" } },
      ];
    }

    if (statusFilter !== "All") {
      filterQuery.status = statusFilter.toLowerCase();
    }

    if (typeFilter !== "All") {
      filterQuery.type = typeFilter.toLowerCase();
    }

    const skip = (page - 1) * limit;
    const enrollmentsCol = db.collection("enrollments");
    const totalMatching = await enrollmentsCol.countDocuments(filterQuery);

    const enrollments = await enrollmentsCol
      .find(filterQuery)
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Calculate overall stats for the dashboard widgets
    const [totalEnrollments, completedCount, pendingCount, revenueAgg] = await Promise.all([
      enrollmentsCol.countDocuments({}),
      enrollmentsCol.countDocuments({ status: "completed" }),
      enrollmentsCol.countDocuments({ status: "pending_payment" }),
      enrollmentsCol.aggregate([
        { $match: { status: "completed" } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]).toArray()
    ]);

    const totalRevenue = revenueAgg.length > 0 ? (revenueAgg[0].total || 0) : 0;

    const formatted = enrollments.map((enr) => ({
      id: enr._id.toString(),
      submittedAt: enr.submittedAt
        ? new Date(enr.submittedAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "—",
      rawSubmittedAt: enr.submittedAt,
      studentName: `${enr.firstName || ""} ${enr.lastName || ""}`.trim() || "Student",
      firstName: enr.firstName || "",
      lastName: enr.lastName || "",
      email: enr.email || "",
      mobile: enr.mobile || "",
      countryCode: enr.countryCode || "+91",
      country: enr.country || "",
      state: enr.state || "",
      city: enr.city || "",
      course: enr.course || "—",
      courseId: enr.courseId || "—",
      amount: enr.amount || 0,
      status: enr.status || "pending_payment",
      merchantTxnNo: enr.merchantTxnNo || "—",
      pgTxnId: enr.pgTxnId || "—",
      type: enr.type || "course",
    }));

    return NextResponse.json({
      success: true,
      enrollments: formatted,
      totalCount: totalMatching,
      currentPage: page,
      totalPages: Math.ceil(totalMatching / limit),
      stats: {
        total: totalEnrollments,
        completed: completedCount,
        pending: pendingCount,
        revenue: totalRevenue,
      },
    });
  } catch (error: any) {
    console.error("[ADMIN ENROLLMENTS API ERROR]", error);
    return NextResponse.json(
      { success: false, message: "Error loading enrollments data" },
      { status: 500 }
    );
  }
}
