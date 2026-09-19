"use client";

import Link from "next/link";
import { LucideIcon, Plus } from "lucide-react";

export type QuickBarItem =
  | {
      type: "link";
      label: string;
      href: string;
      icon?: LucideIcon;
      badge?: string;
    }
  | {
      type: "action";
      label: string;
      onClick: () => void;
      icon?: LucideIcon;
      variant?: "default" | "primary";
    };

interface HorizontalQuickBarProps {
  items: QuickBarItem[];
}

export function HorizontalQuickBar({ items }: HorizontalQuickBarProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto border-b border-border bg-card px-4 py-2.5 sm:px-6">
      {items.map((item, idx) => {
        const Icon = item.icon;

        if (item.type === "link") {
          return (
            <Link
              key={`${item.href}-${idx}`}
              href={item.href}
              className="flex shrink-0 items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {Icon && <Icon className="h-3.5 w-3.5 text-muted-foreground" />}
              <span>{item.label}</span>
              {item.badge && (
                <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        }

        const isPrimary = item.variant === "primary";

        return (
          <button
            key={`${item.label}-${idx}`}
            type="button"
            onClick={item.onClick}
            className={`flex shrink-0 items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
              isPrimary
                ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                : "border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            {Icon ? (
              <Icon className="h-3.5 w-3.5" />
            ) : (
              <Plus className="h-3.5 w-3.5" />
            )}
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}