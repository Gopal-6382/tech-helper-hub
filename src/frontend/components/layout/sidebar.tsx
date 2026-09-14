"use client";

import { NavLinks } from "./nav-links";

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-border lg:block">
      <nav className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col overflow-y-auto p-4">
        <NavLinks />
      </nav>
    </aside>
  );
}