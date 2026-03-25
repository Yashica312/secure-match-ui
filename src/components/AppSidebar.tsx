import { Heart, LayoutDashboard, GitCompareArrows, BarChart3, LogOut, UserPlus, HeartHandshake, Activity } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const mainNav = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Add Donor", url: "/add-donor", icon: HeartHandshake },
  { title: "Add Recipient", url: "/add-recipient", icon: UserPlus },
  { title: "Matching", url: "/matching", icon: GitCompareArrows },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sidebar-primary to-sidebar-primary/70 shadow-lg shadow-sidebar-primary/20">
            <Heart className="h-4 w-4 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] font-bold text-sidebar-accent-foreground tracking-tight truncate">OrganMatch AI</span>
              <span className="text-[10px] text-sidebar-muted font-medium tracking-wide uppercase">Decision Support</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-muted text-[10px] uppercase tracking-[0.08em] font-semibold mb-1 px-3">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <NavLink
                        to={item.url}
                        end
                        className="rounded-lg px-3 py-2 text-sidebar-foreground transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group"
                        activeClassName="bg-sidebar-primary/15 text-sidebar-primary font-semibold"
                      >
                        <item.icon className={`h-[17px] w-[17px] transition-colors ${isActive ? "text-sidebar-primary" : ""}`} />
                        {!collapsed && <span className="text-[13px]">{item.title}</span>}
                        {!collapsed && isActive && (
                          <div className="ml-auto h-1.5 w-1.5 rounded-full bg-sidebar-primary animate-pulse-glow" />
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <div className="mx-3 mt-4 rounded-xl bg-sidebar-accent/60 p-3.5 border border-sidebar-border">
            <div className="flex items-center gap-2 mb-1.5">
              <Activity className="h-3.5 w-3.5 text-sidebar-primary" />
              <span className="text-[11px] font-semibold text-sidebar-accent-foreground">System Status</span>
            </div>
            <p className="text-[10px] text-sidebar-muted leading-relaxed">All services operational. Last sync 2m ago.</p>
          </div>
        )}
      </SidebarContent>

      <SidebarFooter className="p-2 border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink
                to="/"
                className="rounded-lg px-3 py-2 text-sidebar-muted transition-all duration-200 hover:bg-destructive/10 hover:text-destructive"
                activeClassName=""
              >
                <LogOut className="h-[17px] w-[17px]" />
                {!collapsed && <span className="text-[13px]">Sign Out</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
