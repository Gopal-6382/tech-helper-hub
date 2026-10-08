import { AlertCircle } from "lucide-react";
import { Button } from "@/frontend/components/ui/button";

type ErrorStateProps = {
  message?: string | null;
  title?: string;
  onRetry?: () => void;
};

export function ErrorState({
  message,
  title = "Something went wrong",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center gap-3 text-center">
      <AlertCircle className="size-8 text-destructive" />

      <div className="space-y-1">
        <p className="font-medium">{title}</p>

        <p className="text-sm text-muted-foreground">
          {message ?? "Unable to load this content."}
        </p>
      </div>

      {onRetry ? (
        <Button type="button" variant="outline" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  );
}
