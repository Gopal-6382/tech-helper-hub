"use client";

import * as React from "react";

import { cn } from "@/frontend/lib/utils";

type FieldLabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
};

export function FieldLabel({
  className,
  children,
  required,
  ...props
}: FieldLabelProps) {
  return (
    <label
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    >
      {children}

      {required ? <span className="ml-1 text-red-500">*</span> : null}
    </label>
  );
}
