"use client";

import { ConfirmDeleteDialog } from "@/frontend/components/common/confirm-delete-dialog";
import { useDeleteCommentReply } from "@/frontend/features/posts/hooks/comments/comments-replies/use-delete-comment-reply";

type DeleteCommentReplyDialogProps = {
  replyId: string;
  commentId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeleteCommentReplyDialog({
  replyId,
  commentId,
  open,
  onOpenChange,
}: DeleteCommentReplyDialogProps) {
  const deleteMutation = useDeleteCommentReply();

  const handleDelete = () => {
    deleteMutation.mutate(
      {
        replyId,
        commentId,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <ConfirmDeleteDialog
      open={open}
      onOpenChange={onOpenChange}
      onConfirm={handleDelete}
      isPending={deleteMutation.isPending}
      title="Delete reply?"
      description="This action cannot be undone. The reply will be permanently removed."
      confirmText="Delete reply"
    />
  );
}
