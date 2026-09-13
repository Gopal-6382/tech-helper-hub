import { UserMenu } from "@/frontend/components/common/user-menu";
import { ThemeSwitcher } from "@/frontend/components/common/theme-switcher";
import { CreateRequestForm } from "@/frontend/features/servicerequests/components/create-request-form";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="animate-slide-up max-w-3xl">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-primary">Tech Helper Hub</p>
            <div className="flex items-center gap-2">
              <ThemeSwitcher />
              <UserMenu />
            </div>
          </div>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Frontend system test
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Testing Tailwind, themes, typography, responsive design, reusable
            components, and CSS animations.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="h-11 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:opacity-90 active:scale-[0.98]"
            >
              Primary Button
            </button>
            <button
              type="button"
              className="h-11 rounded-lg border border-border bg-background px-5 text-sm font-medium transition hover:bg-surface-muted active:scale-[0.98]"
            >
              Secondary Button
            </button>
          </div>
        </div>

        {/* your existing 3-card grid stays exactly as-is below this */}

        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Form + Select Test</h2>
          <CreateRequestForm />
        </div>
      </section>
    </main>
  );
}
