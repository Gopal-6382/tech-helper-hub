"use client";

import { formatDistanceToNow } from "date-fns";

import { PostMenu } from "../actions/post-menu";
import type { PostHeaderProps } from "../../types/post.types";
import { UserAvatar } from "@/frontend/components/common/user-avatar";

export function PostHeader({
  post,
  isOwner,
  onEdit,
  onDelete,
  onUpdateStatus,
  onReport,
}: PostHeaderProps) {
  const { author } = post;

  return (
    <div className="flex min-w-0 items-start justify-between gap-2 sm:gap-3">
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <UserAvatar
          name={author.name}
          src={author.avatar}
          size="default"
          className="size-9 sm:size-10"
        />

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">
            {author.name ?? "Unknown user"}
          </p>

          <p className="truncate text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>

      <div className="shrink-0">
        <PostMenu
          canEdit={isOwner}
          canDelete={isOwner}
          canUpdateStatus={isOwner}
          onEdit={onEdit}
          onDelete={onDelete}
          onUpdateStatus={onUpdateStatus}
          onReport={onReport}
        />
      </div>
    </div>
  );
}
