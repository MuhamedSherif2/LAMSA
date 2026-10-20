
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, Bell, User, LogOut, Store } from 'lucide-react';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function DashboardNavbar() {
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);
  const pageTitle =
    segments[segments.length - 1]?.replace(/-/g, ' ') || 'Dashboard';

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/70 bg-background/90 px-4 backdrop-blur-xl sm:px-6">
      <SidebarTrigger className="-ml-1 rounded-lg" />

      <Separator orientation="vertical" className="h-6" />

      <div className="min-w-0">
        <h1 className="truncate text-base font-semibold capitalize tracking-tight">
          {pageTitle}
        </h1>
        <p className="hidden text-xs text-muted-foreground sm:block">
          Manage your store
        </p>
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
          className="size-9 rounded-full text-muted-foreground transition-colors hover:text-foreground"
        >
          <Sun className="size-5 dark:hidden" />
          <Moon className="hidden size-5 dark:block" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          className="relative size-9 rounded-full text-muted-foreground transition-colors hover:text-foreground"
        >
          <Bell className="size-5" />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-primary ring-2 ring-background" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="outline"
                className="ml-1 size-9 rounded-full border-border/70 p-0 transition-colors hover:border-primary/40 hover:bg-accent"
                aria-label="User menu"
              >
                <User className="size-4" />
              </Button>
            }
          />
          <DropdownMenuContent
            align="end"
            className="w-56 rounded-xl border-border/70 p-1.5 shadow-lg"
          >
            <div className="px-2 py-2">
              <p className="text-sm font-semibold">My Account</p>
              <p className="text-xs text-muted-foreground">
                Manage your account
              </p>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              render={<Link href="/dashboard/profile" />}
              className="cursor-pointer gap-2 rounded-lg py-2"
            >
              <User className="size-4" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem
              render={<Link href="/" />}
              className="cursor-pointer gap-2 rounded-lg py-2"
            >
              <Store className="size-4" />
              Back to store
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              variant="destructive"
              className="cursor-pointer gap-2 rounded-lg py-2"
            >
              <LogOut className="size-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}