import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

type Role = "admin" | "user";

const ADMIN_PREFIXES = ["/dashboard"];
const USER_PREFIXES = ["/account"];
const GUEST_PREFIXES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];

const ROLE_HOME: Record<Role, string> = {
  admin: "/dashboard",
  user: "/account",
};

/** Split "/ar/dashboard/x" into { locale: "ar", path: "/dashboard/x" }. */
function splitLocale(pathname: string) {
  const segments = pathname.split("/");
  const first = segments[1];

  if (first && (routing.locales as readonly string[]).includes(first)) {
    const path = "/" + segments.slice(2).join("/");
    return { locale: first, path: path === "/" ? "/" : path.replace(/\/$/, "") };
  }
  return { locale: null as string | null, path: pathname.replace(/\/$/, "") || "/" };
}

function matches(path: string, prefixes: string[]) {
  return prefixes.some((p) => path === p || path.startsWith(p + "/"));
}

export default function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const { locale, path } = splitLocale(pathname);

  const token = request.cookies.get("lamsa_token")?.value;
  const roleCookie = request.cookies.get("lamsa_user_role")?.value;
  const role: Role | null =
    roleCookie === "admin" || roleCookie === "user" ? roleCookie : null;

  const isAuthenticated = Boolean(token);

  const isAdminRoute = matches(path, ADMIN_PREFIXES);
  const isUserRoute = matches(path, USER_PREFIXES);
  const isGuestRoute = matches(path, GUEST_PREFIXES);

  // Keep the locale prefix (if the URL had one) on every redirect.
  const redirectTo = (target: string, keepNext = false) => {
    const url = request.nextUrl.clone();
    url.pathname = locale ? `/${locale}${target}` : target;
    url.search = keepNext ? `?next=${encodeURIComponent(pathname + search)}` : "";
    return NextResponse.redirect(url);
  };

  // 1. Not logged in -> protected pages go to login (remember where they were going).
  if (!isAuthenticated && (isAdminRoute || isUserRoute)) {
    return redirectTo("/login", true);
  }

  if (isAuthenticated) {
    // 2. Logged in but role cookie missing/invalid -> treat as logged out.
    if (!role && (isAdminRoute || isUserRoute)) {
      const res = redirectTo("/login", true);
      res.cookies.delete("lamsa_token");
      res.cookies.delete("lamsa_user_role");
      return res;
    }

    if (role) {
      // 3. Logged-in users shouldn't see login/register/etc.
      if (isGuestRoute) {
        return redirectTo(ROLE_HOME[role]);
      }

      // 4. Role separation: admin only in /dashboard, user only in /account.
      if (role === "user" && isAdminRoute) {
        return redirectTo(ROLE_HOME.user);
      }
      if (role === "admin" && isUserRoute) {
        return redirectTo(ROLE_HOME.admin);
      }
    }
  }

  // Everything else goes through next-intl.
  const response = intlMiddleware(request);

  // Preserve the custom locale cookie if it's a supported locale.
  const localeCookie = request.cookies.get("LAMSA_LOCALE")?.value;
  if (
    localeCookie &&
    (routing.locales as readonly string[]).includes(localeCookie)
  ) {
    response.cookies.set("LAMSA_LOCALE", localeCookie);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|trpc|_next|_vercel|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|mjs|json|xml|txt|webmanifest|woff2?|ttf|map)$).*)",
  ],
};