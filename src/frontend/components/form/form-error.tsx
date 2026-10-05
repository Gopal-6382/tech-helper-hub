"use client";

import type { FieldError } from "react-hook-form";

import { cn } from "@/frontend/lib/utils";

type FormErrorProps = {
  error?: FieldError;
  className?: string;
};

export function FormError({ error, className }: FormErrorProps) {
  if (!error?.message) {
    return null;
  }

  return (
    <p
      role="alert"
      className={cn("text-sm font-medium text-red-500", className)}
    >
      {error.message}
    </p>
  );
}
