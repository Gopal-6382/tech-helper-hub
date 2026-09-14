"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { Header } from "./header";
import { Sidebar } from "./sidebar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onMenuClick={() => setMobileMenuOpen(true)} />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar />

        <main className="min-w-0 flex-1">
          <div className="w-full py-6 sm:py-8">
            {children}
          </div>
        </main>
      </div>

      {mobileMenuOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/40"
          />

          <aside className="relative h-full w-[min(82vw,20rem)] max-w-full overflow-y-auto border-r border-border bg-background p-4 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-base font-semibold">
                Navigation
              </span>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
                aria-label="Close navigation menu"
              >
                ×
              </button>
            </div>

            <MobileNavigation
              onNavigate={() => setMobileMenuOpen(false)}
            />
          </aside>
        </div>
      ) : null}
    </div>
  );
}

function MobileNavigation({
  onNavigate,
}: {
  onNavigate: () => void;
}) {
  const navigation = [
    { label: "Home", href: "/web" },
    { label: "Messages", href: "/web/chat" },
    { label: "Bookings", href: "/web/app/bookings" },
    { label: "Notifications", href: "/web/app/notifications" },
    { label: "Profile", href: "/web/app/profile" },
    { label: "Settings", href: "/web/app/settings" },
  ];

  return (
    <nav className="space-y-1">
      {navigation.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          className="flex min-h-11 items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}