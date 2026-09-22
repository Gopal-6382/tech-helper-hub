"use client";

import { Badge } from "@/frontend/components/ui/badge";

type PostStatus = "OPEN" | "SOLVED" | "CLOSED";

type PostStatusBadgeProps = {
  status: PostStatus;
};

export function PostStatusBadge({ status }: PostStatusBadgeProps) {
  const label = {
    OPEN: "Open",
    SOLVED: "Solved",
    CLOSED: "Closed",
  }[status];

  return <Badge variant="secondary">{label}</Badge>;
}
