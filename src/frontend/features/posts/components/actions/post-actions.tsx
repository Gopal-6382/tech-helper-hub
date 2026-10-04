"use client";

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
}: PostActionsProps) {
  return (
    <div className="flex items-center justify-between border-t border-border/60 pt-3">
      <div className="flex items-center gap-1">
        <PostLikeButton
          postId={postId}
          initialLiked={isLiked}
          initialLikeCount={likeCount}
        />

        <PostCommentButton count={commentCount} onClick={onComment} />

        <PostViewCount count={viewCount} viewed={viewed} />
      </div>

      <div className="flex items-center gap-1">
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