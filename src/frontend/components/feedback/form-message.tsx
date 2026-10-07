type FormMessageProps = {
  message?: string | null;
  variant?: "error" | "success";
};

export function FormMessage({ message, variant = "error" }: FormMessageProps) {
  if (!message) {
    return null;
  }

  return (
    <p
      role="alert"
      className={
        variant === "error"
          ? "text-sm text-destructive"
          : "text-sm text-green-600"
      }
    >
      {message}
    </p>
  );
}
