import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(request: NextRequest) {
  const SECRET = process.env.JWT_SECRET as string;
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  let response: NextResponse | null = null;

  // Protect dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      response = NextResponse.redirect(new URL("/auth/login", request.url));
    } else {
      try {
        jwt.verify(token, SECRET);
        response = NextResponse.next();
      } catch {
        response = NextResponse.redirect(new URL("/auth/login", request.url));
        response.cookies.set("token", "", { path: "/", maxAge: 0 });
      }
    }
  }
  // Protect admin dashboard routes
  else if (pathname.startsWith("/admin-dashboard")) {
    if (!token) {
      response = NextResponse.redirect(new URL("/auth/login", request.url));
    } else {
      try {
        const decoded: any = jwt.verify(token, SECRET);
        // Only admin user types allowed
        if (decoded.usertype !== "admin") {
          response = NextResponse.redirect(new URL("/dashboard", request.url));
        } else {
          response = NextResponse.next();
        }
      } catch {
        response = NextResponse.redirect(new URL("/auth/login", request.url));
        response.cookies.set("token", "", { path: "/", maxAge: 0 });
      }
    }
  }
  // Redirect logged-in users away from auth pages
  else if (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup")) {
    if (token) {
      try {
        const decoded: any = jwt.verify(token, SECRET);
        if (decoded.usertype === "admin") {
          response = NextResponse.redirect(new URL("/admin-dashboard", request.url));
        } else {
          response = NextResponse.redirect(new URL("/dashboard", request.url));
        }
      } catch {
        response = NextResponse.next();
        response.cookies.set("token", "", { path: "/", maxAge: 0 });
      }
    }
  }

  // Fallback to next response if no route matched
  if (!response) {
    response = NextResponse.next();
  }

  // Inject Security Headers (Clickjacking, MIME Sniffing, HSTS, Referrer Control)
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  if (process.env.NODE_ENV === "production") {
    response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  }

  return response;
}

// Configuration matcher for route execution
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin-dashboard/:path*",
    "/auth/login",
    "/auth/signup",
  ],
};