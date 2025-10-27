// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('session-token'); // Check koro token ache kina
  const pathname = request.nextUrl.pathname;

  // Protected Routes list
  if (pathname.startsWith('/dashboard') && !token) {
    // Jodi Protected route-e token na thake, login-e redirect koro
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Jodi '/login' e token thake, tahole dashboard-e redirect koro
  if ((pathname === '/login' || pathname === '/register') && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next(); // Baki request gulo chaliye jao
}

// Kon path-e middleware run hobe seta define koro
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};