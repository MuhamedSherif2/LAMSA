"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Moon, ShoppingCart, Sun, User } from "lucide-react";

import { useGetCartQuery } from "@/store/slices/cartSlice";
import { useGetWishlistQuery } from "@/store/slices/wishlistSlice";
import { Button } from "@/components/ui/button";
import useTheme from "@/hooks/useTheme";

interface StoredUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

const getCookie = (name: string): string | null => {
  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${name}=`));

  return cookie
    ? decodeURIComponent(cookie.substring(name.length + 1))
    : null;
};

function Nav() {
  const [user, setUser] = useState<StoredUser | null>(null);

  const { data: cartResponse } = useGetCartQuery();
  const { data: wishlistResponse } = useGetWishlistQuery();

  useEffect(() => {
    let cancelled = false;

    const syncUser = async () => {
      const token = getCookie("lamsa_token");

      if (!token) {
        setUser(null);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}users/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        );

        if (!response.ok) {
          if (!cancelled) setUser(null);
          return;
        }

        const result = await response.json();

        if (!cancelled) {
          setUser(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch current user:", error);

        if (!cancelled) setUser(null);
      }
    };

    syncUser();

    window.addEventListener("lamsa-user-updated", syncUser);

    return () => {
      cancelled = true;
      window.removeEventListener("lamsa-user-updated", syncUser);
    };
  }, []);
  const { theme, toggleTheme, mounted } = useTheme();

  const cart = cartResponse?.data;
  const wishlist = wishlistResponse?.data;

  const cartCount =
    cart?.items?.reduce(
      (total: number, item: { quantity: number }) =>
        total + item.quantity,
      0
    ) ?? 0;

  const wishlistCount = wishlist?.products?.length ?? 0;

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-background/90 shadow-sm backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2 text-xl font-bold tracking-tight text-foreground"
        >
          <span className="transition-colors group-hover:text-accent">
            LAMSA
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-3">
          <Button
            variant="ghost"
            size="icon"
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            title={theme === "dark" ? "Light mode" : "Dark mode"}
            onClick={toggleTheme}
            disabled={!mounted}
            className="size-9 rounded-full text-muted-foreground transition-colors hover:text-foreground"
          >
            {theme === "dark" ? (
              <Sun className="size-5" />
            ) : (
              <Moon className="size-5" />
            )}
          </Button>
          <Link
            href="/wishlist"
            aria-label={`Wishlist, ${wishlistCount} items`}
            className="group relative flex size-10 items-center justify-center rounded-xl text-muted-foreground transition-all duration-200 hover:bg-accent/10 hover:text-accent"
          >
            <Heart className="size-5 transition-transform duration-200 group-hover:scale-110" />

            {wishlistCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold leading-none text-white ring-2 ring-background">
                {wishlistCount > 99 ? "99+" : wishlistCount}
              </span>
            )}
          </Link>

          <Link
            href="/cart"
            aria-label={`Shopping cart, ${cartCount} items`}
            className="group relative flex size-10 items-center justify-center rounded-xl text-muted-foreground transition-all duration-200 hover:bg-accent/10 hover:text-accent"
          >
            <ShoppingCart className="size-5 transition-transform duration-200 group-hover:scale-110" />

            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold leading-none text-white ring-2 ring-background">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <Link
              href={user.role === "admin" ? "/dashboard" : "/account"}
              className="ml-1 flex max-w-40 items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/50 hover:bg-accent/5 sm:ml-2"
            >
              <User className="size-4 shrink-0 text-accent" />
              <span className="hidden truncate sm:inline">
                {user.name}
              </span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="ml-1 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/90 sm:ml-2"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;