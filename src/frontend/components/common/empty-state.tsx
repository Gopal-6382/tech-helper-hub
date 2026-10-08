import { ReactNode } from "react";
import Link from "next/link";
type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  link?: string;
};
export function EmptyState({
  title,
  description,
  action,
  className,
  link,
}: EmptyStateProps) {
  return (
    <div
      className={`flex min-h-75 flex-col items-center justify-center gap-4 ${className}`}
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      {description && <p className="text-muted-foreground">{description}</p>}
      {action}
      {link && (
        <Link href={link} className="text-sm font-medium text-primary">
          {link}
        </Link>
      )}
    </div>
  );
}
