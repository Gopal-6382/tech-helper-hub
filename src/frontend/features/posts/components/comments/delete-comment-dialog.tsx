"use client";

import { Trash2 } from "lucide-react";

import { Button } from "@/frontend/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/frontend/components/ui/dialog";

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete comment?</DialogTitle>

          <DialogDescription>
            This action cannot be undone. The comment will be permanently
            removed.
          </DialogDescription>
        </DialogHeader>

        {deleteMutation.isError && (
          <p className="text-sm text-destructive">
            {deleteMutation.error.message || "Failed to delete comment."}
          </p>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={deleteMutation.isPending}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            disabled={deleteMutation.isPending}
            onClick={handleDelete}
          >
            <Trash2 className="mr-2 size-4" />
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
