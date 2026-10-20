import {
    SidebarInset,
    SidebarProvider,
  } from "@/components/ui/sidebar";
  
  import DashboardSidebar from "@/components/commonComponents/admin/SideBar";
  import DashboardNavbar from "@/components/commonComponents/admin/Nav";
  
  export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <SidebarProvider>
        <div className="flex min-h-svh w-full min-w-0 bg-background">
          <DashboardSidebar />
  
          <SidebarInset className="flex min-h-svh min-w-0 flex-1 flex-col bg-background">
            <DashboardNavbar />
  
            <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
              {children}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    );
  }