import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/commonComponents/admin/SideBar';
import DashboardNavbar from '@/components/commonComponents/admin/Nav';

function Layout({ children }: { children: React.ReactNode; }) {
    return (
        <SidebarProvider>
            <DashboardSidebar />

            <SidebarInset>
                <DashboardNavbar />

                <main className="flex-1 p-4 sm:p-6">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}

export default Layout