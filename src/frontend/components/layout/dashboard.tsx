"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { HorizontalQuickBar, QuickBarItem } from "./quick-actions";
import { CategoryFormDialog } from "@/features/categories/components/category-form-dialog";
import { FolderPlus, FilePlus, LayoutDashboard, Settings } from "lucide-react";
import { PageHeader } from "./page-header";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);

  // Define horizontal header actions and links
  const headerActions: QuickBarItem[] = [
    {
      type: "action",
      label: "New Category",
      icon: FolderPlus,
      variant: "primary",
      onClick: () => setIsCategoryDialogOpen(true),
    },
    {
      type: "action",
      label: "Create Post",
      icon: FilePlus,
      onClick: () => {},
    },
    {
      type: "link",
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      type: "link",
      label: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="md:ml-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <PageHeader title="Dashboard" />
        <HorizontalQuickBar items={headerActions} />
        <main className="p-4 sm:p-6">{children}</main>
      </div>
      <CategoryFormDialog
        isOpen={isCategoryDialogOpen}
        onClose={() => setIsCategoryDialogOpen(false)}
      />
    </div>
  );
}
