
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  Home,
  ShoppingBag,
  LayoutGrid,
  Heart,
  Phone,
  CircleHelp,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Moon,
  Sun,
  ShoppingCart,
} from "lucide-react";

import { useGetAllCategoriesQuery } from "@/store/slices/categorySlice";
import { useGetAllSubCategoriesQuery } from "@/store/slices/subCategorySlice";

import type { Category } from "@/types/category.types";
import type { SubCategory } from "@/types/subcategory.types";

import { Button } from "@/components/ui/button";
import useTheme from "@/hooks/useTheme";

interface NavSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartCount: number;
  wishlistCount: number;
}

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Products", href: "/products", icon: ShoppingBag },
  { name: "Wishlist", href: "/wishlist", icon: Heart },
  { name: "Contact", href: "/contact", icon: Phone },
  { name: "FAQ", href: "/faq", icon: CircleHelp },
];

function NavSidebar({
  isOpen,
  onClose,
  cartCount,
  wishlistCount,
}: NavSidebarProps) {
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const { theme, toggleTheme, mounted: themeMounted } = useTheme();

  const {
    data: categoriesResponse,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useGetAllCategoriesQuery();

  const {
    data: subCategoriesResponse,
    isLoading: subCategoriesLoading,
    isError: subCategoriesError,
  } = useGetAllSubCategoriesQuery();

  const categories: Category[] = categoriesResponse?.data ?? [];
  const subCategories: SubCategory[] =
    subCategoriesResponse?.data ?? [];

  const activeCategories = categories.filter(
    (category) => !category.isDeleted
  );

  const getSubCategories = (categoryId: string): SubCategory[] => {
    return subCategories.filter((subCategory) => {
      const parentId =
        typeof subCategory.category === "string"
          ? subCategory.category
          : subCategory.category?._id;

      return (
        parentId === categoryId &&
        !subCategory.isDeleted
      );
    });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const toggleCategory = (id: string) => {
    setOpenCategory((prev) =>
      prev === id ? null : id
    );
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[9999] transition-[visibility] duration-300 ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      {/* Overlay */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Sidebar */}
      <aside
        id="lamsa-navigation-drawer"
        role="dialog"
        aria-modal={isOpen}
        aria-label="Navigation menu"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`absolute left-0 top-0 flex h-full w-[85%] flex-col border-r border-border bg-background shadow-2xl transition-transform duration-500 ease-in-out sm:w-[70%] md:w-1/2 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-5 sm:px-8 sm:py-6">
          <Link
            href="/"
            onClick={onClose}
            className="text-2xl font-bold tracking-[0.2em] text-foreground sm:text-3xl"
          >
            LAMSA
          </Link>

          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            onClick={onClose}
            aria-label="Close menu"
            className="size-11 rounded-full border-border text-foreground transition-all duration-300 hover:rotate-90 hover:border-accent hover:bg-accent hover:text-white"
          >
            <X className="size-5" />
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Explore Lamsa
          </p>

          {/* Mobile Actions */}
          <div className="mb-6 grid grid-cols-3 gap-2 border-b border-border pb-6 sm:gap-3 md:hidden">
            {/* Theme */}
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={toggleTheme}
              disabled={!themeMounted}
              aria-label="Toggle theme"
              className="flex h-16 min-w-0 flex-col gap-1 rounded-xl px-1"
            >
              {theme === "dark" ? (
                <Sun className="size-5" />
              ) : (
                <Moon className="size-5" />
              )}

              <span className="text-xs">Theme</span>
            </Button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              onClick={onClose}
              className="relative flex h-16 min-w-0 flex-col items-center justify-center gap-1 rounded-xl border border-border text-foreground transition-colors hover:bg-accent/10 hover:text-accent"
            >
              <Heart className="size-5" />
              <span className="text-xs">Wishlist</span>

              {wishlistCount > 0 && (
                <span className="absolute right-1 top-1 rounded-full bg-accent px-1.5 text-[10px] font-bold text-white">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              onClick={onClose}
              className="relative flex h-16 min-w-0 flex-col items-center justify-center gap-1 rounded-xl border border-border text-foreground transition-colors hover:bg-accent/10 hover:text-accent"
            >
              <ShoppingCart className="size-5" />
              <span className="text-xs">Cart</span>

              {cartCount > 0 && (
                <span className="absolute right-1 top-1 rounded-full bg-accent px-1.5 text-[10px] font-bold text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>

          <nav className="space-y-2" aria-label="Main navigation">
            {/* Home and Products */}
            {navLinks.slice(0, 2).map((item) => {
              const Icon = item.icon;

              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`group flex items-center justify-between rounded-xl px-4 py-3 transition-colors sm:px-5 sm:py-4 ${
                    active
                      ? "bg-accent/10 text-accent"
                      : "text-foreground hover:bg-accent/10 hover:text-accent"
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <Icon className="size-5 shrink-0" />

                    <span className="text-base font-medium sm:text-lg">
                      {item.name}
                    </span>
                  </div>

                  <ArrowUpRight className="size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              );
            })}

            {/* Dynamic Categories */}
            <div className="rounded-xl">
              <Button
                type="button"
                variant="ghost"
                size="lg"
                onClick={() =>
                  setCategoriesOpen((prev) => !prev)
                }
                aria-expanded={categoriesOpen}
                className="flex h-auto w-full items-center justify-between rounded-xl px-4 py-3 text-foreground hover:bg-accent/10 hover:text-accent sm:px-5 sm:py-4"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <LayoutGrid className="size-5 shrink-0" />

                  <span className="text-base font-medium sm:text-lg">
                    Categories
                  </span>
                </div>

                <ChevronDown
                  className={`size-5 shrink-0 transition-transform duration-300 ${
                    categoriesOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>

              {categoriesOpen && (
                <div className="mt-2 space-y-1 pl-2 sm:pl-6">
                  {categoriesLoading || subCategoriesLoading ? (
                    <p className="px-4 py-3 text-sm text-muted-foreground">
                      Loading categories...
                    </p>
                  ) : categoriesError || subCategoriesError ? (
                    <p className="px-4 py-3 text-sm text-destructive">
                      Failed to load categories.
                    </p>
                  ) : activeCategories.length === 0 ? (
                    <p className="px-4 py-3 text-sm text-muted-foreground">
                      No categories available
                    </p>
                  ) : (
                    activeCategories.map((category) => {
                      const children = getSubCategories(category._id);
                      const isExpanded =
                        openCategory === category._id;

                      return (
                        <div key={category._id}>
                          <Button
                            type="button"
                            variant="ghost"
                            size="lg"
                            onClick={() =>
                              toggleCategory(category._id)
                            }
                            aria-expanded={isExpanded}
                            className={`flex h-auto w-full items-center justify-between rounded-lg px-3 py-3 text-left transition-colors sm:px-4 ${
                              isExpanded
                                ? "bg-accent/10 text-accent"
                                : "text-foreground hover:bg-accent/5 hover:text-accent"
                            }`}
                          >
                            <span className="min-w-0 truncate text-sm font-semibold sm:text-base">
                              {category.name}
                            </span>

                            <ChevronRight
                              className={`size-4 shrink-0 transition-transform duration-300 ${
                                isExpanded ? "rotate-90" : ""
                              }`}
                            />
                          </Button>

                          {isExpanded && (
                            <div className="ml-2 space-y-1 border-l-2 border-accent/20 py-2 pl-2 sm:ml-4 sm:pl-4">
                              {children.length > 0 ? (
                                children.map((subCategory) => (
                                  <Link
                                    key={subCategory._id}
                                    href={`/subcategories/${subCategory.slug}`}
                                    onClick={onClose}
                                    className={`group flex items-center justify-between gap-2 rounded-lg px-3 py-3 text-sm transition-colors sm:px-4 ${
                                      pathname ===
                                      `/subcategories/${subCategory.slug}`
                                        ? "bg-accent/10 font-semibold text-accent"
                                        : "text-muted-foreground hover:bg-accent/5 hover:text-accent"
                                    }`}
                                  >
                                    <span className="min-w-0 break-words">
                                      {subCategory.name}
                                    </span>

                                    <ArrowUpRight className="size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                                  </Link>
                                ))
                              ) : (
                                <p className="px-3 py-2 text-xs text-muted-foreground">
                                  No subcategories
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            {/* Remaining Links */}
            {navLinks.slice(2).map((item) => {
              const Icon = item.icon;

              const active =
                pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`group flex items-center justify-between rounded-xl px-4 py-3 transition-colors sm:px-5 sm:py-4 ${
                    active
                      ? "bg-accent/10 text-accent"
                      : "text-foreground hover:bg-accent/10 hover:text-accent"
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <Icon className="size-5 shrink-0" />

                    <span className="text-base font-medium sm:text-lg">
                      {item.name}
                    </span>
                  </div>

                  <ArrowUpRight className="size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="border-t border-border px-4 py-5 sm:px-8 sm:py-6">
          <p className="text-sm font-medium text-foreground">
            LAMSA — Premium Fashion
          </p>

          <p className="mt-2 text-xs text-muted-foreground">
            © {new Date().getFullYear()} LAMSA. All rights reserved.
          </p>
        </div>
      </aside>
    </div>,
    document.body
  );
}

export default NavSidebar;
