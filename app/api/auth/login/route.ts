import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { promises as fs } from "fs";
import path from "path";
export const runtime = "nodejs";

const dataDir = path.join(process.cwd(), "data");
const filePath = path.join(dataDir, "signup.json");



async function readUsers() {
    try {
        const fileData = await fs.readFile(filePath, "utf8");

        return JSON.parse(fileData);
    } catch {
        return [];
    }
}

export async function POST(req: Request) {
    try {

        const body = await req.json();

        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: "Email and Password Required" },
                { status: 400 }
            )
        }

        const normalizedEmail = email.toLowerCase().trim();

        const users = await readUsers();


        const user = users.find((u: any) => u.email === normalizedEmail);

        if (!user) {
            return NextResponse.json(
                { success: false, message: "Invaild Email and Password" },
                { status: 401 }
            )
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json(
                { success: false, message: "Invaild Email and Password" },
                { status: 401 }
            )
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                usertype: user.usertype,
            },
            process.env.JWT_SECRET as string,
            { expiresIn: "1d" }
        );
        console.log("COOKIE SET:", token);

        const response = NextResponse.json({
            success: true,
            message: "Login Successfull",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                usertype: user.usertype
            },
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24,
        });
        return response;
    } catch (error) {
        console.error("Login Error", error);
        return NextResponse.json(
            {
                success: false,
                message: "Internal server error"
            },
            { status: 500 }
        )

    }
}

