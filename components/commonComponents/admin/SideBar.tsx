"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Store } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { dashboardSideBarData } from "@/data";

export default function DashboardSidebar() {
  const pathname = usePathname();

  const isActive = (url: string) =>
    pathname === url || pathname.startsWith(`${url}/`);

  return (
    <Sidebar
      collapsible="icon"
      variant="sidebar"
      className="border-sidebar-border"
    >
      <SidebarHeader className="border-b border-sidebar-border px-3 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<Link href="/" />}
              tooltip="Lamsa Store"
              className="h-12 rounded-xl px-2 hover:bg-sidebar-accent"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
                <Store className="size-4" />
              </div>

              <div className="grid min-w-0 flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate text-sm font-bold tracking-tight">
                  LAMSA
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  Store Administration
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground group-data-[collapsible=icon]:hidden">
            Workspace
          </p>

          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {dashboardSideBarData.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={active}
                      tooltip={item.title}
                      className={[
                        "h-10 rounded-xl px-3 transition-colors",
                        active
                          ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
                          : "text-muted-foreground hover:bg-sidebar-accent/70 hover:text-sidebar-foreground",
                      ].join(" ")}
                    >
                      <Icon
                        className={[
                          "size-4.5 shrink-0",
                          active ? "text-accent" : "",
                        ].join(" ")}
                      />
                      <span className="truncate">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-2 px-2 py-2 group-data-[collapsible=icon]:justify-center">
          <span className="size-2 shrink-0 rounded-full bg-accent" />

          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="text-xs font-medium text-sidebar-foreground">
              LAMSA Admin
            </p>
            <p className="text-[11px] text-muted-foreground">
              Version 1.0.0
            </p>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}