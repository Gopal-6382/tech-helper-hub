"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Briefcase, Home, MessageCircle, Settings, User } from "lucide-react";

export const navigation = [
  { label: "Home", href: "/web", icon: Home },
  { label: "Messages", href: "/web/chat", icon: MessageCircle },
  { label: "Bookings", href: "/web/app/bookings", icon: Briefcase },
  { label: "Notifications", href: "/web/app/notifications", icon: Bell },
  { label: "Profile", href: "/web/app/profile", icon: User },
  { label: "Settings", href: "/web/app/settings", icon: Settings },
];

export function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="space-y-1">
      {navigation.map((item) => {
        const Icon = item.icon;
        const isActive =
          pathname === item.href || (item.href !== "/web" && pathname.startsWith(`${item.href}/`));

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex min-h-10 items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Icon className="h-5 w-5 shrink-0" />
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}