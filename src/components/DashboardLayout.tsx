import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet, useLocation } from "react-router-dom";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": { title: "Dashboard", subtitle: "System overview and key metrics" },
  "/add-donor": { title: "Add Donor", subtitle: "Register a new organ donor" },
  "/add-recipient": { title: "Add Recipient", subtitle: "Register a new transplant recipient" },
  "/matching": { title: "Donor–Recipient Matching", subtitle: "AI-powered compatibility analysis" },
  "/analytics": { title: "Analytics", subtitle: "Insights and visualizations" },
};

export function DashboardLayout() {
  const location = useLocation();
  const page = pageTitles[location.pathname] || { title: "OrganMatch AI", subtitle: "" };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 flex items-center justify-between border-b border-border px-6 bg-card shrink-0">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <div className="hidden sm:block">
                <h1 className="text-base font-semibold text-foreground leading-tight">{page.title}</h1>
                <p className="text-xs text-muted-foreground">{page.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-semibold text-primary">AD</span>
              </div>
            </div>
          </header>
          <main className="flex-1 p-6 bg-background overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
