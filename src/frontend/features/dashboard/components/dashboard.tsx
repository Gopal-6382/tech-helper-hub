"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {  X } from "lucide-react";

import { Sidebar } from "@/frontend/components/layout/sidebar";
import { Header } from "@/frontend/components/layout/header";

type DashboardLayoutProps = {
  children: ReactNode;
};

export function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        onMenuClick={() => setIsMobileMenuOpen(true)}
      />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar />

        <main className="min-w-0 flex-1 overflow-x-hidden">
          <div className="w-full py-6 sm:py-8">
            {children}
          </div>
        </main>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/40"
          />

          <aside className="relative h-full w-[min(20rem,85vw)] max-w-full overflow-y-auto border-r border-border bg-background shadow-xl">
            <div className="flex h-16 items-center justify-between border-b border-border px-4">
              <Link
                href="/web"
                className="truncate text-lg font-bold text-primary"
              >
                Tech Helper Hub
              </Link>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <Sidebar
              mobile
              onNavigate={() => setIsMobileMenuOpen(false)}
            />
          </aside>
        </div>
      )}
    </div>
  );
}