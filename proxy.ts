import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const token = request.cookies.get("lamsa_token")?.value;
  const userRole = request.cookies.get("lamsa_user_role")?.value
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
    if (userRole == "user") {
      const url = new URL("/user", request.url);
      const res = NextResponse.redirect(url);
      return res;
    } else if (userRole == "admin") {
      const url = new URL("/dashboard", request.url);
      const res = NextResponse.redirect(url);
      return res;
    } else {
      const url = new URL("/", request.url);
      request.cookies.delete("lamsa_token")
      const res = NextResponse.redirect(url);
      return res;
    }
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