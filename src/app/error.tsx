// src/app/error.tsx
"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/frontend/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled runtime error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <div className="space-y-4 max-w-md">
        <h1 className="text-4xl font-bold text-destructive">
          Something went wrong!
        </h1>
        <p className="text-muted-foreground text-sm">
          An unexpected error occurred while processing your request.
        </p>
        <div className="pt-4 flex justify-center gap-3">
          <Button onClick={() => reset()} variant="default">
            Try Again
          </Button>
          <Button variant="outline" asChild>
            <Link href="/web/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
