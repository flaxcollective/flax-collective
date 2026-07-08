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
    const limit = parseInt(searchParams.get("limit") || "8", 10);
    const search = searchParams.get("search") || "";
    const statusFilter = searchParams.get("status") || "All";

    const filterQuery: any = {};
    if (search) {
      filterQuery.$or = [
        { merchantTxnNo: { $regex: search, $options: "i" } },
        { pgTxnId: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { course: { $regex: search, $options: "i" } }
      ];
    }

    if (statusFilter !== "All") {
      filterQuery.status = statusFilter.toLowerCase();
    }

    const skip = (page - 1) * limit;
    const transactionsCol = db.collection("transactions");
    const totalMatching = await transactionsCol.countDocuments(filterQuery);

    const transactions = await transactionsCol.aggregate([
      { $match: filterQuery },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "enrollments",
          localField: "enrollmentId",
          foreignField: "_id",
          as: "enrollment"
        }
      },
      {
        $unwind: {
          path: "$enrollment",
          preserveNullAndEmptyArrays: true
        }
      }
    ]).toArray();

    const formatted = transactions.map(t => ({
      id: t._id.toString(),
      merchantTxnNo: t.merchantTxnNo,
      pgTxnId: t.pgTxnId || "—",
      amount: t.amount,
      status: t.status,
      createdAt: t.createdAt ? new Date(t.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }) : "—",
      email: t.email,
      course: t.course,
      courseId: t.courseId || "—",
      studentName: t.enrollment ? `${t.enrollment.firstName} ${t.enrollment.lastName}` : "Unknown"
    }));

    return NextResponse.json({
      success: true,
      transactions: formatted,
      totalCount: totalMatching,
      currentPage: page,
      totalPages: Math.ceil(totalMatching / limit)
    });
  } catch (error: any) {
    console.error("Admin Payments Error:", error);
    return NextResponse.json(
      { success: false, message: "Error loading payment transactions" },
      { status: 500 }
    );
  }
}
