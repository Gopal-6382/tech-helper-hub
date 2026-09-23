"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DynamicIcon } from "@/frontend/components/common/icon";
import {
  userNavigation,
  professionalNavigation,
} from "@/frontend/config/navigation";
import { cn } from "@/frontend/lib/utils";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function Sidebar({ open, onClose }: Props) {
  const pathname = usePathname();

  const isProfessional = pathname.startsWith("/web/professional");

  const navigation = isProfessional
    ? [...userNavigation, ...professionalNavigation]
    : userNavigation;

  return (
    <>
      {/* Mobile overlay — always mounted so it can fade out */}
      <button
        type="button"
        aria-label="Close sidebar"
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-black/40 md:hidden",
          "transition-opacity duration-300",
          open
            ? "pointer-events-auto opacity-100 animate-in fade-in duration-300"
            : "pointer-events-none opacity-0 animate-out fade-out duration-300",
        )}
      />

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-64 border-r bg-background",
          "transition-transform duration-300 ease-out",
          "md:translate-x-0",
          open
            ? "translate-x-0 animate-in fade-in slide-in-from-left duration-300"
            : "-translate-x-full animate-out fade-out slide-out-to-left duration-300",
          !open && "pointer-events-none",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link href="/web" className="font-semibold">
            Tech Helper Hub
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 hover:bg-muted md:hidden"
            aria-label="Close sidebar"
          >
            <DynamicIcon name="close" size={20} />
          </button>
        </div>

        <nav className="space-y-1 p-3">
          {navigation.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/web" && pathname.startsWith(item.href + "/"));

            return (
              <Link
                key={`${item.title}-${item.href}`}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2",
                  "text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <DynamicIcon name={item.icon} size={18} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
