"use client";

import { Loader2, Trash2 } from "lucide-react";

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
import { FormMessage } from "@/frontend/components/feedback/form-message";

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

        <FormMessage message={deleteMutation.error?.message} />

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
            <FormMessage
              icon={
                deleteMutation.isPending ? (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                ) : (
                  <Trash2 className="mr-2 size-4" />
                )
              }
              message={
                deleteMutation.isPending ? "Deleting..." : "Delete reply"
              }
              variant={deleteMutation.isPending ? "info" : "success"}
            />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
