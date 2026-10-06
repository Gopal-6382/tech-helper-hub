"use client";

import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

import { PostMenu } from "../actions/post-menu";
import type { PostHeaderProps } from "../../types/post.types";

export function PostHeader({
  post,
  isOwner,
  onEdit,
  onDelete,
  onUpdateStatus,
  onReport,
}: PostHeaderProps) {
  const { author } = post;

  const avatarFallback = (author.name ?? "U").charAt(0).toUpperCase();

  return (
    <div className="flex min-w-0 items-start justify-between gap-2 sm:gap-3">
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <div className="relative size-9 shrink-0 overflow-hidden rounded-full bg-muted sm:size-10">
          {author.avatar ? (
            <Image
              src={author.avatar}
              alt={author.name ?? "User"}
              fill
              sizes="(max-width: 640px) 36px, 40px"
              className="object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-xs font-semibold sm:text-sm">
              {avatarFallback}
            </div>
          )}
        </div>

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
