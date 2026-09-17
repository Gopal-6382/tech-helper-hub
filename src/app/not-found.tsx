// src/app/not-found.tsx
import Link from 'next/link';
import { buttonVariants } from '@/frontend/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <div className="space-y-4 max-w-md">
        <h1 className="text-7xl font-extrabold text-primary">404</h1>
        <h2 className="text-2xl font-semibold tracking-tight">Page Not Found</h2>
        <p className="text-muted-foreground text-sm">
          Sorry, the page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="pt-4 flex justify-center gap-4">
          <Link href="/web" className={buttonVariants()}>
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}