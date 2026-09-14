import { Sidebar } from "@/frontend/components/layout/sidebar";
import { Header } from "@/frontend/components/layout/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={true} />
      <div className="flex-1 flex flex-col">
        <Header
          sidebarOpen={true}
          onToggleSidebar={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        <main className="flex-1 p-6 bg-muted/10">{children}</main>
      </div>
    </div>
  );
}
