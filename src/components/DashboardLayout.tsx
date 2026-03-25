import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet, useLocation } from "react-router-dom";
import { Bell, Search } from "lucide-react";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": { title: "Dashboard", subtitle: "System overview and key metrics" },
  "/add-donor": { title: "Add Donor", subtitle: "Register a new organ donor" },
  "/add-recipient": { title: "Add Recipient", subtitle: "Register a new transplant recipient" },
  "/matching": { title: "Donor–Recipient Matching", subtitle: "AI-powered compatibility analysis" },
  "/analytics": { title: "Analytics", subtitle: "Insights and data visualizations" },
};

export function DashboardLayout() {
  const location = useLocation();
  const page = pageTitles[location.pathname] || { title: "OrganMatch AI", subtitle: "" };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b border-border px-5 bg-card/80 backdrop-blur-sm shrink-0 sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground transition-colors" />
              <div className="h-5 w-px bg-border hidden sm:block" />
              <div className="hidden sm:block">
                <h1 className="text-sm font-semibold text-foreground leading-tight">{page.title}</h1>
                <p className="text-[11px] text-muted-foreground">{page.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
                <Search className="h-4 w-4" />
              </button>
              <button className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all relative">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
              </button>
              <div className="h-5 w-px bg-border mx-1" />
              <div className="flex items-center gap-2.5 cursor-pointer group">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center transition-shadow group-hover:shadow-[var(--shadow-glow)]">
                  <span className="text-[11px] font-bold text-primary-foreground">AD</span>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 p-5 bg-background overflow-auto">
            <div className="animate-in-page">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
