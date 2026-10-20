"use client";

import { usePathname } from "next/navigation";
import Nav from "@/components/commonComponents/user/Nav";

export default function UserNavbar() {
    const pathname = usePathname();

    if (
        pathname.startsWith("/dashboard") ||
        pathname.startsWith("/login") ||
        pathname.startsWith("/register") ||
        pathname.startsWith("/verify-email") ||
        pathname.startsWith("/forgot-password") ||
        pathname.startsWith("/reset-password")
    ) {
        return null;
    }

    return <Nav />;
}