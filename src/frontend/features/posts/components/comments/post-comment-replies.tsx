"use client";

import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Loader2 } from "lucide-react";

import { useCommentReplies } from "@/frontend/features/posts/hooks/comments/comments-replies/use-comment-replies";

type PostCommentRepliesProps = {
  commentId: string;
  postId: string;
};

export function PostCommentReplies({ commentId }: PostCommentRepliesProps) {
  const { data: replies = [], isLoading, error } = useCommentReplies(commentId);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 py-2 text-xs text-muted-foreground">
        <Loader2 className="size-3 animate-spin" />
        Loading replies...
      </div>
    );
  }

  if (error) {
    return (
      <p className="py-2 text-xs text-destructive">Failed to load replies.</p>
    );
  }

  if (!replies.length) {
    return null;
  }

  return (
    <div className="mt-3 space-y-3 border-l-2 pl-4">
      {replies.map((reply) => {
        const authorName = reply.author?.name ?? "Unknown user";
        const avatarFallback = authorName.charAt(0).toUpperCase();

        return (
          <div key={reply.id} className="flex gap-2.5">
            <div className="relative size-7 shrink-0 overflow-hidden rounded-full bg-muted">
              {reply.author?.avatar ? (
                <Image
                  src={reply.author.avatar}
                  alt={authorName}
                  fill
                  sizes="28px"
                  className="object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center text-[10px] font-semibold">
                  {avatarFallback}
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-xs font-semibold">{authorName}</p>

                <span className="text-[11px] text-muted-foreground">
                  {formatDistanceToNow(new Date(reply.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>

              <p className="mt-0.5 whitespace-pre-wrap text-sm">
                {reply.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
