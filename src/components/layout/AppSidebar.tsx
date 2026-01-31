import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Sparkles,
  BarChart3,
  Lightbulb,
  Lock,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    enabled: true,
  },
  {
    title: "Companies",
    url: "/companies",
    icon: Building2,
    enabled: true,
  },
  {
    title: "Skills",
    url: "/skills",
    icon: Sparkles,
    enabled: false,
    disabledReason: "Requires skill & role datasets",
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
    enabled: true,
  },
  {
    title: "Innovation",
    url: "/innovation",
    icon: Lightbulb,
    enabled: false,
    disabledReason: "Requires innovation framework data",
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = location.pathname === item.url;
                const Icon = item.icon;

                if (!item.enabled) {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        className="opacity-50 cursor-not-allowed hover:bg-transparent"
                        tooltip={item.disabledReason}
                      >
                        <Lock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{item.title}</span>
                        <Badge variant="secondary" className="ml-auto text-[10px] px-1.5 py-0">
                          Soon
                        </Badge>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.url}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                        )}
                      >
                        <Icon className={cn("w-4 h-4", isActive && "text-primary")} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
