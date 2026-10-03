"use client";

import { MessageCircle } from "lucide-react";

export function PostCommentButton({
  count = 0,
  onClick,
}: PostCommentButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="View comments"
      className="group flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    >
      <MessageCircle className="h-6 w-6 transition-transform group-hover:scale-110" />
      <span>{count}</span>
    </button>
  );
}
