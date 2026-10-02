'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Store } from 'lucide-react';
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
} from '@/components/ui/sidebar';
import { sideBarDashboardData } from '@/data';

function DashboardSidebar() {
    const pathname = usePathname();

    const isActive = (url: string) =>
        pathname === url || pathname.startsWith(url + '/');

    return (
        <Sidebar collapsible="icon" variant="sidebar">
            {/* ============ Header ============ */}
            <SidebarHeader className="border-b border-sidebar-border">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            render={<Link href="/" />}
                            className="data-[slot=sidebar-menu-button]:p-2!"
                        >
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-accent text-accent-foreground shrink-0">
                                <Store className="size-4" />
                            </div>

                            <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                                <span className="truncate font-semibold">Lamsa Store</span>
                                <span className="truncate text-xs text-muted-foreground">
                                    Admin Panel
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* ============ Content ============ */}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {sideBarDashboardData.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <SidebarMenuItem key={item.id}>
                                        <SidebarMenuButton
                                            render={<Link href={item.href} />}
                                            isActive={isActive(item.href)}
                                            tooltip={item.title}
                                        >
                                            <Icon className="size-4" />
                                            <span>{item.title}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* ============ Footer ============ */}
            <SidebarFooter className="border-t border-sidebar-border">
                <div className="px-2 py-1 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
                    v1.0.0
                </div>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}

export default DashboardSidebar;