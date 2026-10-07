"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Loader2 } from "lucide-react";

import { useAuth } from "@/frontend/context/auth-context";

import type { CommentReply } from "@/frontend/features/posts/types/comment-reply.types";

import { useCommentReplies } from "@/frontend/features/posts/hooks/comments/comments-replies/use-comment-replies";

import { CommentMenu } from "./comment-menu";
import { EditCommentReplyDialog } from "./EditCommentReplyDialog";
import { DeleteCommentReplyDialog } from "./DeleteCommentReplyDialog";
import { UserAvatar } from "@/frontend/components/common/user-avatar";

type PostCommentRepliesProps = {
  commentId: string;
};

export function PostCommentReplies({ commentId }: PostCommentRepliesProps) {
  const { user } = useAuth();

  const { data: replies = [], isLoading, error } = useCommentReplies(commentId);

  const [editingReply, setEditingReply] = useState<CommentReply | null>(null);

  const [deletingReply, setDeletingReply] = useState<CommentReply | null>(null);

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
    <>
      <div className="mt-3 space-y-3 border-l-2 pl-4">
        {replies.map((reply) => {
          const authorName = reply.author?.name ?? "Unknown user";

          const isOwner = user?.id === reply.authorId;

          return (
            <div key={reply.id} className="flex gap-2.5">
              <UserAvatar
                name={authorName}
                src={reply.author?.avatar}
                size="default"
                className="size-9 sm:size-10"
              />

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <p className="truncate text-xs font-semibold">
                      {authorName}
                    </p>

                    <span className="shrink-0 text-[11px] text-muted-foreground">
                      {formatDistanceToNow(new Date(reply.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>

                  {isOwner && (
                    <CommentMenu
                      onEdit={() => setEditingReply(reply)}
                      onDelete={() => setDeletingReply(reply)}
                    />
                  )}
                </div>

                <p className="mt-0.5 whitespace-pre-wrap text-sm">
                  {reply.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {editingReply && (
        <EditCommentReplyDialog
          replyId={editingReply.id}
          commentId={editingReply.commentId}
          content={editingReply.content}
          open={true}
          onOpenChange={(open) => {
            if (!open) {
              setEditingReply(null);
            }
          }}
        />
      )}

      {deletingReply && (
        <DeleteCommentReplyDialog
          replyId={deletingReply.id}
          commentId={deletingReply.commentId}
          open={true}
          onOpenChange={(open) => {
            if (!open) {
              setDeletingReply(null);
            }
          }}
        />
      )}
    </>
  );
}
