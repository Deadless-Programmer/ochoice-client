import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
 
export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const pathname = request.nextUrl.pathname;

  // ✅ Public routes
  if (pathname === "/login" || pathname === "/register") {
    if (refreshToken) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // ✅ Protected routes check
  if (pathname.startsWith("/dashboard")) {
    if (!refreshToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Cookie থাকলে user role অনুযায়ী path check করা হবে
    const dashboardPath = pathname.split("/")[2]; // e.g. admin, customer

    try {
      
      const tokenPayload = JSON.parse(
        Buffer.from(refreshToken.split(".")[1], "base64").toString()
      );

      const userRole = tokenPayload.role;

      // 🔒 Role mismatch হলে redirect করো
      if (
        (dashboardPath === "admin" && userRole !== "admin") ||
        (dashboardPath === "seller" && userRole !== "seller") ||
        (dashboardPath === "customer" && userRole !== "customer") ||
        (dashboardPath === "superAdmin" && userRole !== "superAdmin")
      ) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    } catch (err) {
      console.error("Token parse failed:", err);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/register",
  ],
};
