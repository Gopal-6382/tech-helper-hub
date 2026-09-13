import { Container } from "@/frontend/components/layout/container";
import { PageHeader } from "@/frontend/components/layout/page-header";

export default function Page() {
  return (
    <Container>
      <div className="py-6 space-y-6">
        {/* Page-specific title and actions header */}
        <PageHeader title="Overview" />

        {/* Page Body / Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-card border rounded-lg shadow-sm">
            <h3 className="font-semibold text-sm text-muted-foreground">
              Active Bookings
            </h3>
            <p className="text-2xl font-bold mt-2">12</p>
          </div>
          <div className="p-6 bg-card border rounded-lg shadow-sm">
            <h3 className="font-semibold text-sm text-muted-foreground">
              Pending Requests
            </h3>
            <p className="text-2xl font-bold mt-2">4</p>
          </div>
          <div className="p-6 bg-card border rounded-lg shadow-sm">
            <h3 className="font-semibold text-sm text-muted-foreground">
              Total Messages
            </h3>
            <p className="text-2xl font-bold mt-2">28</p>
          </div>
        </div>
      </div>
    </Container>
  );
}
