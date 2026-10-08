import type { ReactNode } from "react";

type FormMessageProps = {
  message?: string | null;
  variant?: "error" | "success" | "info" | "warning" | "danger" | "default";
  icon?: ReactNode;
};

const variantClasses: Record<
  NonNullable<FormMessageProps["variant"]>,
  string
> = {
  error: "text-sm text-destructive",
  danger: "text-sm text-destructive",
  success: "text-sm text-green-600",
  info: "text-sm text-blue-600",
  warning: "text-sm text-amber-600",
  default: "text-sm text-muted-foreground",
};

export function FormMessage({
  message,
  variant = "error",
  icon,
}: FormMessageProps) {
  if (!message) return null;

  return (
    <p
      role="alert"
      className={`flex items-center gap-2 ${variantClasses[variant]}`}
    >
      {icon}
      {message}
    </p>
  );
}
