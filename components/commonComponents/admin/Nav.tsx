'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, Bell, User, LogOut, Store } from 'lucide-react';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function DashboardNavbar() {
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);
  const pageTitle =
    segments[segments.length - 1]?.replace(/-/g, ' ') || 'Dashboard';

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 backdrop-blur-md px-4 sm:px-6">
      <SidebarTrigger className="-ml-1" />

      <Separator orientation="vertical" className="h-6" />

      <h1 className="text-base font-medium capitalize truncate">
        {pageTitle}
      </h1>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Toggle theme">
          <Sun className="size-5 dark:hidden" />
          <Moon className="size-5 hidden dark:block" />
        </Button>

        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="size-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                className="relative size-9 rounded-full p-0"
                aria-label="User menu"
              />
            }
          >
            <Avatar className="size-9">
              <AvatarFallback className="bg-accent text-accent-foreground text-xs font-medium">
                AD
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem render={<Link href="/dashboard/profile" />}>
              <User className="size-4" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem render={<Link href="/" />}>
              <Store className="size-4" />
              Back to store
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem variant="destructive">
              <LogOut className="size-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}