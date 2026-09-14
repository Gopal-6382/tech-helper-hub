import { Container } from "@/frontend/components/layout/container";
import { PageHeader } from "@/frontend/components/layout/page-header";

export default function DashboardPage() {
  return (
    <Container>
      <PageHeader
        title="Dashboard"
        description="Overview of your Tech Helper Hub activity."
      />

      <div className="rounded-xl border border-border bg-surface p-6">
        <h2 className="text-xl font-semibold">
          Dashboard is working
        </h2>

        <p className="mt-2 text-muted-foreground">
          Your DashboardLayout and page are connected correctly.
        </p>
      </div>
    </Container>
  );
}