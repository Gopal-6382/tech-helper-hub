// src/app/web/layout.tsx
import React from 'react';

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Global Header or Navbar can go here */}
      <main className="flex-1">{children}</main>
      {/* Global Footer can go here */}
    </div>
  );
}