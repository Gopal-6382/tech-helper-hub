"use client";

import * as React from "react";

import { cn } from "@/frontend/lib/utils";

type FieldProps = React.HTMLAttributes<HTMLDivElement> & {
  invalid?: boolean;
};

export function Field({ className, invalid, ...props }: FieldProps) {
  return (
    <div
      data-invalid={invalid ? true : undefined}
      className={cn("space-y-2", className)}
      {...props}
    />
  );
}
