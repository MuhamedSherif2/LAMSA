import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";



export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const token = request.cookies.get("lamsa_token")?.value;
  const isAuthenticated = Boolean(token);

  const isAuthRoute = /dashboard/i.test(pathname);
  const isGuestRoute = /login|register/i.test(pathname);

  // --- Unauthenticated user on protected page ---
  if (!isAuthenticated && isAuthRoute) {
    const url = new URL("/login", request.url);
    const res = NextResponse.redirect(url);

    return res;
  }

  // --- Authenticated user on login/register ---
  if (isAuthenticated && isGuestRoute) {
    const url = new URL("/dashboard", request.url);
    const res = NextResponse.redirect(url);

    return res;
  }

  // Always return a response containing cookies
  const res = NextResponse.next();
  return res
}

export const config = {
  matcher: [
    "/((?!api|trpc|_next|_vercel|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|mjs|json|xml|txt|webmanifest|woff2?|ttf|map)$).*)",
  ],
};