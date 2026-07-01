import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";

const defaultCourses = [
  {
    courseId: "HPF",
    title: "Hospitality Professional Foundations (HPF)",
    desc: "A Refined Gateway To Hospitality—Building Poise, Discipline, And Service Mindset.",
    fullDesc: "This program builds a strong base in core hospitality practices, service standards, and professional conduct. It focuses on grooming, communication, guest interaction, and operational awareness—ensuring individuals are prepared to perform with confidence in real-world environments. Through structured learning and practical exposure, participants develop the mindset, discipline, and adaptability required to meet international hospitality expectations.",
    category: "Hospitality",
    duration: "6 Months",
    price: "10000",
    lessons: 15,
    hours: 20,
    image: "/assets/images/programs-img/hfg.png",
    icon: "/assets/icons/HPF.png"
  },
  {
    courseId: "HOSC",
    title: "Hotel Operations & Systems Certification (HOSC)",
    desc: "Immersive Hotel Operations Training—Building Precision, Efficiency, And Excellence.",
    fullDesc: "This program builds a strong foundation in essential hotel operations, service standards, and professional conduct. It focuses on developing skills in grooming, communication, guest interaction, and operational awareness—preparing individuals to perform confidently in real-world hospitality environments. Through structured learning and practical exposure, participants develop the mindset, discipline, and adaptability required to meet global hospitality standards.",
    category: "Hospitality",
    duration: "6 Months",
    price: "15000",
    lessons: 15,
    hours: 20,
    image: "/assets/images/programs-img/hosc.png",
    icon: "/assets/icons/HOSC.png"
  },
  {
    courseId: "HCPS",
    title: "Hospitality Communication & Professional Skills (HCPS)",
    desc: "Master Communication, Presence, And Interpersonal Finesse.",
    fullDesc: "This program focuses on developing effective communication and interpersonal skills essential for the hospitality industry. It equips individuals with the confidence to engage with guests, handle real-world interactions, and maintain professional conduct across diverse environments. Through structured learning and practical exposure, participants build clarity in communication, service mindset, and the adaptability required to meet global hospitality standards.",
    category: "Hospitality",
    duration: "6 Months",
    price: "17000",
    lessons: 12,
    hours: 18,
    image: "/assets/images/programs-img/hcps.png",
    icon: "/assets/icons/HCPS.png"
  },
  {
    courseId: "IGEC",
    title: "International Guest Experience Certification (IGEC)",
    desc: "Build A Global Outlook On Guest Relations With Cultural Sensitivity And Personalized Service.",
    fullDesc: "This program focuses on delivering exceptional guest experiences aligned with international hospitality standards. It develops skills in guest engagement, service personalization, cultural awareness, and problem resolution—ensuring individuals can create memorable and consistent service interactions. Through structured learning and practical exposure, participants build the confidence, professionalism, and adaptability required to exceed global guest expectations.",
    category: "Communication",
    duration: "6 Months",
    price: "20000",
    lessons: 10,
    hours: 12,
    image: "/assets/images/programs-img/igcs.png",
    icon: "/assets/icons/IGEC.png"
  },
  {
    courseId: "CSIPB",
    title: "Career Success & International Placement Bootcamp (CSIPB)",
    desc: "A Focused Path To Success—Building Confidence, Polish, And Global Readiness.",
    fullDesc: "This program prepares individuals for career transitions and international placement opportunities in hospitality. It focuses on resume building, interview preparation, professional branding, and workplace readiness—ensuring candidates present themselves confidently to global employers. Through structured guidance and practical training, participants develop the skills and adaptability required to secure and succeed in international roles.",
    category: "Management",
    duration: "6 Months",
    price: "25000",
    lessons: 20,
    hours: 25,
    image: "/assets/images/programs-img/csipb.png",
    icon: "/assets/icons/CSIPB.png"
  },
  {
    courseId: "PSSF",
    title: "Professional Skills & Soft Skills Foundation (PSSF)",
    desc: "Refined Personal And Professional Growth—Enhancing Communication, And Etiquette.",
    fullDesc: "This program builds a strong foundation in essential professional and soft skills required across the hospitality industry. It focuses on communication, teamwork, time management, and workplace etiquette—preparing individuals to perform effectively in professional environments. Through structured learning and practical exposure, participants develop confidence, adaptability, and a service-oriented mindset needed for long-term career success.",
    category: "Communication",
    duration: "6 Months",
    price: "12000",
    lessons: 14,
    hours: 16,
    image: "/assets/images/programs-img/pssf.png",
    icon: "/assets/icons/PSSF.png"
  },
  {
    courseId: "RESM",
    title: "Real Estate Sales & Management (RESM)",
    desc: "An Elevated Program To Refine Client Engagement, Negotiation, And Real Estate Acumen.",
    fullDesc: "This program builds a strong foundation in real estate sales, property management, and client handling. It focuses on market understanding, sales techniques, negotiation skills, and regulatory awareness—preparing individuals to perform confidently in real estate environments. Through structured learning, participants develop the professionalism, communication skills, and adaptability required to succeed in dynamic property markets.",
    category: "Real Estate",
    duration: "6 Months",
    price: "12000",
    lessons: 14,
    hours: 16,
    image: "/assets/images/programs-img/resm.png",
    icon: "/assets/icons/RESM.png"
  },
  {
    courseId: "BSLHC",
    title: "Butler Service & Luxury Hospitality Certification (BSLHC)",
    desc: "Luxury Service Training—Master Bespoke Guest Care And Refined Butler Standards.",
    fullDesc: "This program builds a strong foundation in butler service and luxury hospitality standards. It focuses on personalized service, etiquette, discretion, and attention to detail—preparing individuals to deliver refined guest experiences in high-end environments. Through structured learning and practical exposure, participants develop professionalism, confidence, and the adaptability required to meet global luxury hospitality expectations.",
    category: "Professional Skills",
    duration: "6 Months",
    price: "25000",
    lessons: 14,
    hours: 16,
    image: "/assets/images/programs-img/bslhc.png",
    icon: "/assets/icons/BSLHC.png"
  },
  {
    courseId: "PBGEC",
    title: "Professional Bartending & Guest Engagement Certification (PBGEC)",
    desc: "Master Bartending With Technical Skill, Charm, And Guest Engagement.",
    fullDesc: "This program builds a strong foundation in professional bartending and guest engagement. It focuses on mixology techniques, beverage knowledge, service etiquette, and customer interaction—preparing individuals to create engaging and high-quality guest experiences. Through structured learning and practical exposure, participants develop confidence, creativity, and the adaptability required to perform in dynamic hospitality environments.",
    category: "Professional Skills",
    duration: "6 Months",
    price: "25000",
    lessons: 14,
    hours: 16,
    image: "/assets/images/programs-img/pbgec.png",
    icon: "/assets/icons/PBGEC.png"
  },
  {
    courseId: "CFHC",
    title: "Childcare & Family Guest Services Certification (CFHC)",
    desc: "Thoughtful Family Care—Blending Warmth, Responsibility, And Hospitality Excellence.",
    fullDesc: "This program builds a strong foundation in childcare and family guest services within hospitality environments. It focuses on child safety, care routines, communication with families, and service sensitivity—preparing individuals to support family-friendly guest experiences. Through structured learning and practical exposure, participants develop patience, responsibility, and the professionalism required to deliver safe and engaging care services.",
    category: "Professional Skills",
    duration: "6 Months",
    price: "25000",
    lessons: 14,
    hours: 16,
    image: "/assets/images/programs-img/cfhc.png",
    icon: "/assets/icons/CFHC.png"
  }
];

export async function GET() {
  try {
    const db = await getDb();
    const coursesCol = db.collection("courses");

    let courses = await coursesCol.find({}).toArray();

    // Seed if empty
    if (courses.length === 0) {
      const now = new Date().toISOString();
      const seeded = defaultCourses.map(c => ({
        ...c,
        createdAt: now,
        updatedAt: now
      }));
      await coursesCol.insertMany(seeded);
      courses = await coursesCol.find({}).toArray();
    }

    return NextResponse.json({ success: true, courses });
  } catch (error: any) {
    console.error("GET Courses Error:", error);
    return NextResponse.json(
      { success: false, message: "Error loading courses" },
      { status: 500 }
    );
  }
}

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

    const body = await req.json();
    const { courseId, title, slug, desc, duration, price, image, category, fullDesc, isActive, icon } = body;

    if (!courseId || !title || !desc || !duration || !price || !image) {
      return NextResponse.json(
        { success: false, message: "All required fields must be provided." },
        { status: 400 }
      );
    }

    const coursesCol = db.collection("courses");
    const existing = await coursesCol.findOne({ courseId: courseId.toUpperCase().trim() });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "Course with this Course ID already exists." },
        { status: 400 }
      );
    }

    const finalSlug = (slug && slug.trim() !== "")
      ? slug.trim()
      : title.trim().toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");

    const now = new Date().toISOString();
    const newCourse = {
      courseId: courseId.toUpperCase().trim(),
      title: title.trim(),
      slug: finalSlug,
      desc: desc.trim(),
      fullDesc: (fullDesc || desc).trim(),
      duration: duration.trim(),
      price: price.toString().trim(),
      category: category || "Hospitality",
      lessons: 12,
      hours: 16,
      image,
      icon: icon ? icon.trim() : `/assets/icons/${courseId.toUpperCase().trim()}.png`,
      isActive: isActive !== false,
      createdAt: now,
      updatedAt: now
    };

    await coursesCol.insertOne(newCourse);

    return NextResponse.json({
      success: true,
      message: "Course created successfully",
      course: newCourse
    });
  } catch (error: any) {
    console.error("POST Course Error:", error);
    return NextResponse.json(
      { success: false, message: "Error creating course: " + (error.message || "Unknown error") },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
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

    const body = await req.json();
    const { courseId, title, slug, desc, duration, price, image, category, fullDesc, isActive, icon } = body;

    if (!courseId || !title || !desc || !duration || !price) {
      return NextResponse.json(
        { success: false, message: "Required fields are missing." },
        { status: 400 }
      );
    }

    const coursesCol = db.collection("courses");
    const existing = await coursesCol.findOne({ courseId: courseId.toUpperCase().trim() });
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Course not found." },
        { status: 404 }
      );
    }

    const finalSlug = (slug && slug.trim() !== "")
      ? slug.trim()
      : title.trim().toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");

    const updateFields: any = {
      title: title.trim(),
      slug: finalSlug,
      desc: desc.trim(),
      fullDesc: (fullDesc || desc).trim(),
      duration: duration.trim(),
      price: price.toString().trim(),
      category: category || "Hospitality",
      isActive: isActive !== false,
      icon: icon ? icon.trim() : (existing.icon || ""),
      updatedAt: new Date().toISOString()
    };

    if (image) {
      updateFields.image = image;
    }

    await coursesCol.updateOne(
      { courseId: courseId.toUpperCase().trim() },
      { $set: updateFields }
    );

    return NextResponse.json({
      success: true,
      message: "Course updated successfully",
      course: {
        ...existing,
        ...updateFields
      }
    });
  } catch (error: any) {
    console.error("PUT Course Error:", error);
    return NextResponse.json(
      { success: false, message: "Error updating course: " + (error.message || "Unknown error") },
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
    const user = await db.collection("users").findOne({ id: decoded.id });

    if (!user || (user.usertype !== "admin" && user.usertype !== "employee")) {
      return NextResponse.json(
        { success: false, message: "Forbidden: Admin access required." },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json(
        { success: false, message: "Course ID is required." },
        { status: 400 }
      );
    }

    const coursesCol = db.collection("courses");
    const result = await coursesCol.deleteOne({ courseId: courseId.toUpperCase().trim() });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Course not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Course deleted successfully"
    });
  } catch (error: any) {
    console.error("DELETE Course Error:", error);
    return NextResponse.json(
      { success: false, message: "Error deleting course: " + (error.message || "Unknown error") },
      { status: 500 }
    );
  }
}

