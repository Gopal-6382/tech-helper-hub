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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete reply?</DialogTitle>

          <DialogDescription>
            This action cannot be undone. The reply will be permanently removed.
          </DialogDescription>
        </DialogHeader>

        {deleteMutation.isError && (
          <p className="text-sm text-destructive">
            {deleteMutation.error.message || "Failed to delete reply."}
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
