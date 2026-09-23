"use client";

import { Menu } from "lucide-react";

type Props = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: Props) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background px-4">
      <button
        onClick={onMenuClick}
        className="rounded-md p-2 hover:bg-muted md:hidden"
        aria-label="Open sidebar"
      >
        <Menu size={22} />
      </button>
    </header>
  );
}
