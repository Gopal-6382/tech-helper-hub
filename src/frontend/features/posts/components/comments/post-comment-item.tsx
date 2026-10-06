"use client";

import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

import type { Comment } from "@/frontend/features/posts/types/comment.types";
import { PostCommentReplies } from "./post-comment-replies";

type PostCommentItemProps = {
  comment: Comment;
  postId: string;
};

export function PostCommentItem({ comment, postId }: PostCommentItemProps) {
  const authorName = comment.author?.name ?? "Unknown user";
  const avatarFallback = authorName.charAt(0).toUpperCase();

  return (
    <div className="px-4 py-4">
      <div className="flex gap-3">
        <div className="relative size-9 shrink-0 overflow-hidden rounded-full bg-muted">
          {comment.author?.avatar ? (
            <Image
              src={comment.author.avatar}
              alt={authorName}
              fill
              sizes="36px"
              className="object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-xs font-semibold">
              {avatarFallback}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold">{authorName}</p>

            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>

          <p className="mt-1 whitespace-pre-wrap text-sm leading-6">
            {comment.content}
          </p>

          <PostCommentReplies commentId={comment.id} postId={postId} />
        </div>
      </div>
    </div>
  );
}
