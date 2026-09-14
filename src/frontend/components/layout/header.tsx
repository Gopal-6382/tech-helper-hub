"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { DynamicIcon } from "@/frontend/components/common/icon";
import { dashboardRoutes } from "@/frontend/config/navigation";

interface HeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function Header({ sidebarOpen, onToggleSidebar }: HeaderProps) {
  const pathname = usePathname();

  // Dynamic Breadcrumb Resolver
  const pathSegments = pathname?.split("/").filter(Boolean) || [];
  const matchedRoute = dashboardRoutes.find((r) => pathname?.startsWith(r.href));

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background px-6">
      {/* Sidebar Controls & Route Breadcrumbs */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="Toggle Navigation Sidebar"
        >
          <DynamicIcon name={sidebarOpen ? "close" : "menu"} size={20} />
        </button>

        <nav className="hidden items-center gap-2 text-sm md:flex text-muted-foreground">
          <Link href="/web" className="hover:text-foreground transition-colors">
            Home
          </Link>
          {pathSegments.map((segment, index) => {
            const url = `/${pathSegments.slice(0, index + 1).join("/")}`;
            const isLast = index === pathSegments.length - 1;

            return (
              <span key={url} className="flex items-center gap-2 capitalize">
                <span className="text-muted-foreground/60">/</span>
                {isLast ? (
                  <span className="font-semibold text-foreground">
                    {matchedRoute?.title || segment}
                  </span>
                ) : (
                  <Link href={url} className="hover:text-foreground transition-colors">
                    {segment}
                  </Link>
                )}
              </span>
            );
          })}
        </nav>
      </div>

      {/* User Context Area */}
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-xs border border-primary/20">
          U
        </div>
      </div>
    </header>
  );
}