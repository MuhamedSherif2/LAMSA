
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Heart,
  Menu,
  Moon,
  ShoppingCart,
  Sun,
  User,
} from "lucide-react";

import { useGetCartQuery } from "@/store/slices/cartSlice";
import { useGetWishlistQuery } from "@/store/slices/wishlistSlice";
import { Button } from "@/components/ui/button";
import useTheme from "@/hooks/useTheme";
import NavSidebar from "./NavSidebar";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { theme, toggleTheme, mounted } = useTheme();

  const { data: cartResponse } = useGetCartQuery();
  const { data: wishlistResponse } = useGetWishlistQuery();

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const syncUser = async () => {
      const token = getCookie("lamsa_token");

      if (!token) {
        if (!cancelled) setUser(null);
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

  const cartCount =
    cartResponse?.data?.items?.reduce(
      (total: number, item: { quantity: number }) =>
        total + item.quantity,
      0
    ) ?? 0;

  const wishlistCount =
    wishlistResponse?.data?.products?.length ?? 0;

  return (
    <>
      <nav className="sticky top-0 z-40 border-b border-border bg-background/90 shadow-sm backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between gap-2 px-4 sm:px-6">
          {/* Menu */}
          <Button
            type="button"
            variant="ghost"
            size="icon-lg"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            aria-controls="lamsa-navigation-drawer"
            className="rounded-xl text-foreground hover:bg-accent/10 hover:text-accent"
          >
            <Menu className="size-6" />
          </Button>

          {/* Logo */}
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-foreground transition-colors hover:text-accent sm:text-xl"
          >
            LAMSA
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-1 md:gap-3">
            {/* Desktop Only */}
            <div className="hidden items-center gap-1 md:flex md:gap-3">
              {/* Theme */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={
                  theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
                title={theme === "dark" ? "Light mode" : "Dark mode"}
                onClick={toggleTheme}
                disabled={!mounted}
                className="size-9 rounded-full text-muted-foreground hover:text-foreground"
              >
                {theme === "dark" ? (
                  <Sun className="size-5" />
                ) : (
                  <Moon className="size-5" />
                )}
              </Button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                aria-label={`Wishlist, ${wishlistCount} items`}
                className="group relative flex size-10 items-center justify-center rounded-xl text-muted-foreground transition-all duration-200 hover:bg-accent/10 hover:text-accent"
              >
                <Heart className="size-5 transition-transform group-hover:scale-110" />

                {wishlistCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white ring-2 ring-background">
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                aria-label={`Shopping cart, ${cartCount} items`}
                className="group relative flex size-10 items-center justify-center rounded-xl text-muted-foreground transition-all duration-200 hover:bg-accent/10 hover:text-accent"
              >
                <ShoppingCart className="size-5 transition-transform group-hover:scale-110" />

                {cartCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white ring-2 ring-background">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Account / Login - Always Visible */}
            {user ? (
              <Link
                href={
                  user.role === "admin"
                    ? "/dashboard"
                    : "/account"
                }
                className="flex max-w-32 items-center gap-2 rounded-xl border border-border bg-card px-2.5 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/50 hover:bg-accent/5 sm:max-w-40 sm:px-3"
              >
                <User className="size-4 shrink-0 text-accent" />

                <span className="hidden truncate sm:inline">
                  {user.name}
                </span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:px-4"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      <NavSidebar
        isOpen={isMenuOpen}
        onClose={closeMenu}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />
    </>
  );
}

export default Nav;