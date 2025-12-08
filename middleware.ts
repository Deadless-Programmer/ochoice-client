import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // ⚠️ CHANGE: এখন আমরা "accessToken" কুকি চেক করব
  const token = request.cookies.get("accessToken")?.value; 
  const pathname = request.nextUrl.pathname;

  // ✅ Public routes (Login/Register)
  if (pathname === "/login" || pathname === "/register") {
    // যদি টোকেন থাকে, ড্যাশবোর্ডে পাঠাও
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // ✅ Protected routes check
  if (pathname.startsWith("/dashboard")) {
    // টোকেন না থাকলে লগইনে পাঠাও
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const dashboardPath = pathname.split("/")[2]; // e.g. admin, customer

    try {
      // টোকেন ডিকোড করা (JWT Structure: header.payload.signature)
      const tokenPayload = JSON.parse(
        Buffer.from(token.split(".")[1], "base64").toString()
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
      // টোকেন ভুল হলে লগইনে পাঠাও
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