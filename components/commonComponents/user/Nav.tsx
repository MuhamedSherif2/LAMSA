"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart, User } from "lucide-react";
import { useGetCartQuery } from "@/store/slices/cartSlice";
import { useGetWishlistQuery } from "@/store/slices/wishlistSlice";

interface StoredUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

function Nav() {
  const [user, setUser] = useState<StoredUser | null>(null);

  const { data: cartResponse } = useGetCartQuery();
  const { data: wishlistResponse } = useGetWishlistQuery();

  useEffect(() => {
    const syncUser = () => {
      const stored = localStorage.getItem("lamsa_user");

      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    syncUser();

    window.addEventListener("lamsa-user-updated", syncUser);
    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener("lamsa-user-updated", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);
  // Adjust these paths according to your API response structure.
  const cart = cartResponse?.data;
  const wishlist = wishlistResponse?.data;

  const cartCount = cart?.items?.reduce((total, item) => total + item.quantity, 0) ?? 0;

  const wishlistCount = wishlist?.products?.length ?? 0;

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-background/90 shadow-sm backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-xl font-bold tracking-tight text-foreground"
        >
          <span className="transition-colors group-hover:text-accent">
            LAMSA
          </span>
        </Link>

        {/* Navigation Actions */}
        <div className="flex items-center gap-1 sm:gap-3">
          {/* Wishlist */}
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

          {/* Cart */}
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

          {/* User / Login */}
          {user ? (
            <Link
              href={user.role === "admin" ? "/dashboard" : "/account"}
              className="ml-1 flex max-w-40 items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/50 hover:bg-accent/5 sm:ml-2"
            >
              <User className="size-4 shrink-0 text-accent" />
              <span className="hidden truncate sm:inline">{user.name}</span>
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