// src/app/(dashboard)/layout.tsx

import DashboardLayout from "@/frontend/components/layout/dashboard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
