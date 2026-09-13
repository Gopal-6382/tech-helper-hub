export function Header() {
  return (
    <header className="border-b border-border bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <h1 className="text-xl font-bold">My App</h1>
        <nav className="hidden md:flex md:space-x-4">
          <a href="#" className="text-sm font-medium hover:underline">
            Dashboard
          </a>
          <a href="#" className="text-sm font-medium hover:underline">
            Settings
          </a>
        </nav>
      </div>
    </header>
  );
}
