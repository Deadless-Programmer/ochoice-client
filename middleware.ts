import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
 
  const token = request.cookies.get("accessToken")?.value; 
  const pathname = request.nextUrl.pathname;

  
  if (pathname === "/login" || pathname === "/register") {
   
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // ✅ Protected routes check
  if (pathname.startsWith("/dashboard")) {
  
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const dashboardPath = pathname.split("/")[2]; // e.g. admin, customer

    try {
      
      const tokenPayload = JSON.parse(
        Buffer.from(token.split(".")[1], "base64").toString()
      );

      const userRole = tokenPayload.role;

     
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