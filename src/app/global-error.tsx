// src/app/global-error.tsx
'use client';

import React from 'react';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="p-6 text-center max-w-md">
          <h2 className="text-2xl font-bold text-destructive mb-2">Critical System Error</h2>
          <p className="text-sm text-muted-foreground mb-4">
            A fatal error occurred at the root level.
          </p>
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}