"use client";

import { Menu } from "lucide-react";
import { LogoutButton } from "@/features/auth/components/logout";

type Props = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: Props) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center border-b border-border bg-background px-4">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground md:hidden"
        aria-label="Open sidebar"
      >
        <Menu size={22} />
      </button>

      <div className="ml-auto">
        <LogoutButton />
      </div>
    </header>
  );
}