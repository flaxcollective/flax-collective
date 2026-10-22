import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
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

    const filterQuery: any = {};

    if (search) {
      filterQuery.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { mobile: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;
    const contactsCol = db.collection("contacts");
    const totalMatching = await contactsCol.countDocuments(filterQuery);

    const contacts = await contactsCol
      .find(filterQuery)
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Stats calculations
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const [totalContacts, todayContacts, weekContacts] = await Promise.all([
      contactsCol.countDocuments({}),
      contactsCol.countDocuments({ submittedAt: { $gte: today } }),
      contactsCol.countDocuments({ submittedAt: { $gte: sevenDaysAgo } }),
    ]);

    const formatted = contacts.map((c) => ({
      id: c._id.toString(),
      name: c.name || "Anonymous",
      email: c.email || "",
      mobile: c.mobile || "",
      countryCode: c.countryCode || "+91",
      message: c.message || "",
      submittedAt: c.submittedAt
        ? new Date(c.submittedAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "—",
      rawSubmittedAt: c.submittedAt,
    }));

    return NextResponse.json({
      success: true,
      contacts: formatted,
      totalCount: totalMatching,
      currentPage: page,
      totalPages: Math.ceil(totalMatching / limit),
      stats: {
        total: totalContacts,
        today: todayContacts,
        week: weekContacts,
      },
    });
  } catch (error: any) {
    console.error("[ADMIN CONTACTS API ERROR]", error);
    return NextResponse.json(
      { success: false, message: "Error loading contact inquiries" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
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
    const id = searchParams.get("id");

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid contact inquiry ID." },
        { status: 400 }
      );
    }

    const result = await db.collection("contacts").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Inquiry not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Contact inquiry deleted successfully.",
    });
  } catch (error: any) {
    console.error("[ADMIN DELETE CONTACT ERROR]", error);
    return NextResponse.json(
      { success: false, message: "Server error deleting inquiry." },
      { status: 500 }
    );
  }
}
