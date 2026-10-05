"use client";

import { Loader2 } from "lucide-react";
import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";

type SubmitButtonProps = ComponentProps<typeof Button> & {
  isSubmitting?: boolean;
  loadingText?: string;
};

export function SubmitButton({
  children,
  isSubmitting,
  loadingText = "Saving...",
  disabled,
  ...props
}: SubmitButtonProps) {
  return (
    <Button type="submit" disabled={isSubmitting || disabled} {...props}>
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
