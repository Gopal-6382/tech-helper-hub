import React from "react";
import { DashboardLayout } from "@/frontend/components/layout/dashboard";
import { Header } from "@/frontend/components/layout/header";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout>
      <div className="flex min-h-screen">
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 bg-muted/20">{children}</main>
        </div>
      </div>
    </DashboardLayout>
  );
}
