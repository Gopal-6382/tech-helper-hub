"use client";

import { ConfirmDeleteDialog } from "@/frontend/components/common/confirm-delete-dialog";
import { useDeletePost } from "@/frontend/features/posts/hooks/posts/use-delete-post";
import { DeletePostDialogProps } from "@/features/posts/types/post-action.types";

export function DeletePostDialog({
  postId,
  open,
  onOpenChange,
  onDeleted,
}: DeletePostDialogProps) {
  const deleteMutation = useDeletePost();

  const handleDelete = () => {
    deleteMutation.mutate(postId, {
      onSuccess: () => {
        onOpenChange(false);
        onDeleted?.();
      },
    });
  };

  return (
    <ConfirmDeleteDialog
      open={open}
      onOpenChange={onOpenChange}
      onConfirm={handleDelete}
      isPending={deleteMutation.isPending}
      title="Delete post?"
      description="This action cannot be undone. The post will be permanently removed."
    />
  );
}
