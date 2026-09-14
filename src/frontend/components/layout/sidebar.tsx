"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardRoutes } from "@/frontend/config/navigation";
import { NavItem } from "@/frontend/config/navigation.types";
import { DynamicIcon } from "@/frontend/components/common/icon";

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu((prev) => (prev === title ? null : title));
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r bg-background transition-all duration-300 md:static ${
        isOpen
          ? "w-64 translate-x-0"
          : "-translate-x-full md:w-20 md:translate-x-0"
      }`}
    >
      {/* Brand Section */}
      <div className="flex h-16 items-center gap-3 border-b px-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold shrink-0">
          TH
        </div>
        {isOpen && (
          <span className="font-semibold text-foreground text-lg truncate">
            Tech Helper
          </span>
        )}
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {dashboardRoutes.map((item: NavItem) => {
          const hasChildren = Boolean(item.children?.length);
          const isActive =
            pathname === item.href ||
            (item.href !== "/web" && pathname?.startsWith(item.href));
          const isSubmenuOpen = openSubmenu === item.title || isActive;

          return (
            <div key={item.title} className="flex flex-col">
              {hasChildren ? (
                <button
                  onClick={() => toggleSubmenu(item.title)}
                  className={`flex items-center justify-between w-full rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-accent text-accent-foreground font-semibold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <DynamicIcon
                      name={item.icon}
                      className={
                        isActive ? "text-primary" : "text-muted-foreground"
                      }
                    />
                    {isOpen && <span className="truncate">{item.title}</span>}
                  </div>
                  {isOpen && (
                    <DynamicIcon
                      name={isSubmenuOpen ? "chevronDown" : "chevronRight"}
                      size={14}
                      className="text-muted-foreground"
                    />
                  )}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <DynamicIcon name={item.icon} />
                  {isOpen && <span className="truncate">{item.title}</span>}
                </Link>
              )}

              {/* Submenu Dropdown */}
              {hasChildren && isSubmenuOpen && isOpen && (
                <div className="ml-8 mt-1 space-y-1 border-l pl-2">
                  {item.children?.map((sub) => {
                    const isSubActive = pathname === sub.href;
                    return (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className={`block rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                          isSubActive
                            ? "text-primary font-bold bg-primary/10"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {sub.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
