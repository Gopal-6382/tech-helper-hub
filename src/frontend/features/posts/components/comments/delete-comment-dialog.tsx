"use client";

import { ConfirmDeleteDialog } from "@/frontend/components/common/confirmDeleteDialog";
import { useDeleteComment } from "@/frontend/features/posts/hooks/comments/use-delete-comment";

type DeleteCommentDialogProps = {
  commentId: string;
  postId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeleteCommentDialog({
  commentId,
  postId,
  open,
  onOpenChange,
}: DeleteCommentDialogProps) {
  const deleteMutation = useDeleteComment();

  const handleDelete = () => {
    deleteMutation.mutate(
      {
        commentId,
        postId,
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
      title="Delete comment?"
      description="This action cannot be undone. The comment will be permanently removed."
    />
  );
}
