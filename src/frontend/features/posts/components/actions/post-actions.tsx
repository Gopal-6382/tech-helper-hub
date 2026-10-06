"use client";

import { MapPin } from "lucide-react";

import { PostCommentButton } from "./post-comment-button";
import { PostLikeButton } from "./post-like-button";
import { PostSaveButton } from "./post-save-button";
import { PostShareDialog } from "./post-share-dialog";
import { PostViewCount } from "./post-view-count";

import type { PostActionsProps } from "@/frontend/features/posts/types/post-action.types";

export function PostActions({
  postId,
  likeCount,
  commentCount,
  saveCount,
  isLiked,
  isSaved,
  viewCount,
  viewed,
  onComment,
  city,
}: PostActionsProps) {
  return (
    <div className="flex min-w-0 flex-col gap-2 border-t border-border/60 pt-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-wrap items-center gap-1">
        <PostLikeButton
          postId={postId}
          initialLiked={isLiked}
          initialLikeCount={likeCount}
        />

        <PostCommentButton count={commentCount} onClick={onComment} />

        <PostViewCount count={viewCount} viewed={viewed} />

        {city && (
          <span className="flex min-w-0 max-w-full items-center gap-1 px-1 text-xs font-medium text-muted-foreground sm:text-sm">
            <MapPin className="size-3.5 shrink-0" />

            <span className="truncate">{city}</span>
          </span>
        )}
      </div>

      <div className="flex shrink-0 items-center justify-start gap-1 sm:ml-auto">
        <PostSaveButton
          postId={postId}
          initialSaved={isSaved}
          initialSaveCount={saveCount}
        />

        <PostShareDialog postId={postId} />
      </div>
    </div>
  );
}
