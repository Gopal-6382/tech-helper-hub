"use client";

import { useState } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

import type { Comment } from "@/frontend/features/posts/types/comment.types";

import { useAuth } from "@/frontend/context/auth-context";

import { PostCommentReplies } from "./post-comment-replies";
import { CommentMenu } from "./comment-menu";
import { EditCommentDialog } from "./edit-comment-dialog";
import { DeleteCommentDialog } from "./delete-comment-dialog";

type PostCommentItemProps = {
  comment: Comment;
  postId: string;
};

export function PostCommentItem({ comment, postId }: PostCommentItemProps) {
  const { user } = useAuth();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const authorName = comment.author?.name ?? "Unknown user";
  const avatarFallback = authorName.charAt(0).toUpperCase();

  const isOwner = user?.id === comment.authorId;

  return (
    <>
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
            <div className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <p className="truncate text-sm font-semibold">{authorName}</p>

                <span className="shrink-0 text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>

              {isOwner && (
                <CommentMenu
                  onEdit={() => setIsEditOpen(true)}
                  onDelete={() => setIsDeleteOpen(true)}
                />
              )}
            </div>

            <p className="mt-1 whitespace-pre-wrap text-sm leading-6">
              {comment.content}
            </p>

            <PostCommentReplies commentId={comment.id} />
          </div>
        </div>
      </div>

      {isEditOpen && (
        <EditCommentDialog
          commentId={comment.id}
          postId={postId}
          content={comment.content}
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
        />
      )}

      {isDeleteOpen && (
        <DeleteCommentDialog
          commentId={comment.id}
          postId={postId}
          open={isDeleteOpen}
          onOpenChange={setIsDeleteOpen}
        />
      )}
    </>
  );
}
