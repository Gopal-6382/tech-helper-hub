"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { userNavigation } from "@/frontend/config/navigation";
import { cn } from "@/frontend/lib/utils";
import { DynamicIcon } from "@/frontend/components/common/icon";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 px-3 py-4">
      {userNavigation.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/web" && pathname?.startsWith(`${item.href}/`));
        return (
          <Link
            key={`${item.title}-${item.href}`}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
          >
            <DynamicIcon name={item.icon} size={16} />
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
