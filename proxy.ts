import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const token = request.cookies.get("template_token")?.value;

  const protectedRoutes = [
    "/profile",
    "/checkout",
    "/cart",
    "/wishlist",
    "/allorders",
  ];

  const authRoutes = [
    "/login",
    "/register",
    "/forget-password",
  ];

  const isAuthenticated = Boolean(token);

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Guest trying to access protected route
  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  // Authenticated user trying to access auth pages
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/checkout/:path*",
    "/cart",
    "/wishlist",
    "/allorders/:path*",
    "/login",
    "/register",
    "/forget-password/:path*",
  ],
};