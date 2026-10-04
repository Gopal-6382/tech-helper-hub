import { Eye } from "lucide-react";
import { PostViewCountProps } from "@/features/posts/types/post-action.types";

export function PostViewCount({
  count = 0,
  viewed = false,
}: PostViewCountProps) {
  return (
    <span className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground">
      <Eye
        className={[
          "size-6 transition-colors",
          viewed ? "fill-red-500 text-red-500" : "text-muted-foreground",
        ].join(" ")}
      />

      <span>{count}</span>
    </span>
  );
}
