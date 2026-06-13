import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as string;


export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  // Protect dashboard
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    try {
      jwt.verify(token, SECRET);
      return NextResponse.next();
    } catch {
      const res = NextResponse.redirect(
        new URL("/auth/login", request.url)
      );

      res.cookies.delete("token");
      return res;
    }
  }

    // =========================
  // PROTECT ADMIN DASHBOARD
  // =========================
  if (pathname.startsWith("/admin-dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    try {
      const decoded: any = jwt.verify(token, SECRET);

      // ONLY ADMIN ALLOWED
      if (decoded.usertype !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      return NextResponse.next();
    } catch {
      const res = NextResponse.redirect(
        new URL("/auth/login", request.url)
      );

      res.cookies.delete("token");
      return res;
    }
  }


  if (pathname.startsWith("/auth/login") ||  pathname.startsWith("/auth/signup")) {
    if (token) {

     try {
        const decoded: any = jwt.verify(token, SECRET);

          if (decoded.usertype === "admin") {
          return NextResponse.redirect(
            new URL("/admin-dashboard", request.url)
          );
        }
         return NextResponse.redirect(
          new URL("/dashboard", request.url)
        );
      } catch {
        const res = NextResponse.next();
        res.cookies.delete("token");
        return res;
      }
    }
  }

  return NextResponse.next();
}

// 👇 config SAME FILE me
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin-dashboard/:path*",
    "/auth/login",
    "/auth/signup",
  ],
};