"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

import type { Comment } from "@/frontend/features/posts/types/comment.types";

import { useAuth } from "@/frontend/context/auth-context";

import { PostCommentReplies } from "./post-comment-replies";
import { CommentMenu } from "./comment-menu";
import { EditCommentDialog } from "./edit-comment-dialog";
import { DeleteCommentDialog } from "./delete-comment-dialog";
import { PostCommentReplyForm } from "../form/post-replies.form";
import { UserAvatar } from "@/frontend/components/common/user-avatar";

type PostCommentItemProps = {
  comment: Comment;
  postId: string;
};

export function PostCommentItem({ comment, postId }: PostCommentItemProps) {
  const { user } = useAuth();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const authorName = comment.author?.name ?? "Unknown user";

  const isOwner = user?.id === comment.authorId;

  return (
    <>
      <div className="px-4 py-4">
        <div className="flex gap-3">
          <UserAvatar
            name={authorName}
            src={comment.author?.avatar}
            size="default"
            className="size-9 sm:size-10"
          />

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
            {user?.id && (
              <PostCommentReplyForm commentId={comment.id} authorId={user.id} />
            )}
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
