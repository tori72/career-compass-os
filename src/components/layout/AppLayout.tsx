import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Compass } from "lucide-react";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="h-14 border-b border-border bg-background flex items-center px-4 gap-4 sticky top-0 z-10">
            <SidebarTrigger className="lg:hidden" />
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">SRM DCC</span>
            </div>
            <div className="flex-1" />
            <span className="text-xs text-muted-foreground hidden sm:block">
              Digital Career Compass
            </span>
          </header>
          
          {/* Main content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
          
          {/* Footer */}
          <footer className="border-t border-border py-3 px-4 text-center">
            <p className="text-xs text-muted-foreground">
              Built by students under structured training programs • Powered by{" "}
              <a 
                href="https://talenciaglobal.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Talenciaglobal
              </a>
            </p>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
