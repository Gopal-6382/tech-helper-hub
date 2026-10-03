export default function BookingsPage() {
  return (
    <div className="bg-background text-foreground font-sans min-h-screen">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4">
        <h1 className="text-xl font-bold">Profile Page</h1>
      </header>

      {/* Layout */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-4">
          <nav className="space-y-2">
            <a className="block py-2 px-3 rounded-md bg-sidebar-accent text-sidebar-accent-foreground">
              Dashboard
            </a>
            <a className="block py-2 px-3">Bookings</a>
            <a className="block py-2 px-3">Settings</a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-(--page-padding) space-y-6">
          {/* Card */}
          <div className="bg-card text-card-foreground p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Welcome Back!</h2>
            <p className="text-muted-foreground">
              Manage your profile and bookings here.
            </p>
            <button className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded-md">
              Update Profile
            </button>
          </div>

          {/* Alert */}
          <div className="p-4 rounded-md bg-success text-white">
            ✔ Success: Your booking was confirmed.
          </div>
        </main>
      </div>
    </div>
  );
}
