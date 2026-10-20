import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("lamsa_token")?.value;
  const userRole = request.cookies.get("lamsa_user_role")?.value;

  const isAuthenticated = Boolean(token);

  const isAdminRoute =
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/");

  const isUserRoute =
    pathname === "/" ||
    pathname.startsWith("/");

  const isGuestRoute =
    pathname === "/login" ||
    pathname === "/register";

  // Guests cannot access protected pages
  if (!isAuthenticated && (isAdminRoute || isUserRoute)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Admin dashboard
  if (isAdminRoute) {
    if (userRole === "admin" && isAuthenticated) {
      return NextResponse.next();
    }

    if (userRole === "user" && isAuthenticated) {
      return NextResponse.redirect(new URL("/user", request.url));
    }

    const response = NextResponse.redirect(
      new URL("/login", request.url),
    );

    response.cookies.delete("lamsa_token");
    response.cookies.delete("lamsa_user_role");

    return response;
  }

  // User area
  if (isUserRoute) {
    if (userRole === "user" && isAuthenticated) {
      return NextResponse.next();
    }

    if (userRole === "admin" && isAuthenticated) {
      return NextResponse.redirect(
        new URL("/dashboard", request.url),
      );
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Login and register pages
  if (isAuthenticated && isGuestRoute) {
    if (userRole === "admin") {
      return NextResponse.redirect(
        new URL("/dashboard", request.url),
      );
    }

    if (userRole === "user") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|trpc|_next|_vercel|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|mjs|json|xml|txt|webmanifest|woff2?|ttf|map)$).*)",
  ],
};