import type { ReactNode } from "react";

type FormMessageProps = {
  message?: string | null;
  variant?: "error" | "success" | "info" | "warning" | "default";
  icon?: ReactNode;
};

const variantClasses: Record<
  NonNullable<FormMessageProps["variant"]>,
  string
> = {
  error: "border border-destructive/30 bg-destructive/10 text-destructive",
  success: "border border-success/30 bg-success/10 text-success",
  info: "border border-primary/30 bg-primary/10 text-primary",
  warning: "border border-warning/30 bg-warning/10 text-warning",
  default: "border bg-muted text-muted-foreground",
};

export function FormMessage({
  message,
  variant = "default",
  icon,
}: FormMessageProps) {
  if (!message) return null;

  return (
    <p
      role={variant === "error" ? "alert" : undefined}
      aria-live={variant === "error" ? "assertive" : "polite"}
      className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${variantClasses[variant]}`}
    >
      {icon}
      <span>{message}</span>
    </p>
  );
}
