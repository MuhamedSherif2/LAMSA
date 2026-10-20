
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

  const isGuestRoute =
    pathname === "/login" ||
    pathname === "/register";

  // Protect the admin dashboard.
  if (isAdminRoute) {
    if (isAuthenticated && userRole === "admin") {
      return NextResponse.next();
    }

    const response = NextResponse.redirect(
      new URL("/login", request.url)
    );

    // Clear invalid or unauthorized dashboard session cookies.
    response.cookies.delete("lamsa_token");
    response.cookies.delete("lamsa_user_role");

    return response;
  }

  // Redirect authenticated users away from login/register.
  if (isAuthenticated && isGuestRoute) {
    if (userRole === "admin") {
      return NextResponse.redirect(
        new URL("/dashboard", request.url)
      );
    }

    if (userRole === "user") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // All other routes remain accessible.
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|trpc|_next|_vercel|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|mjs|json|xml|txt|webmanifest|woff2?|ttf|map)$).*)",
  ],
};
