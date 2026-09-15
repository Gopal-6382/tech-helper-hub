// src/frontend/components/layout/dashboard-layout.tsx

"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { PageHeader } from "./page-header";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="md:ml-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
<PageHeader title="hi" />
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
