import { Eye } from "lucide-react";

export function PostViewCount({ count = 0 }: PostViewCountProps) {
  return (
    <span className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground">
      <Eye className="h-6 w-6" />
      <span>{count}</span>
    </span>
  );
}
