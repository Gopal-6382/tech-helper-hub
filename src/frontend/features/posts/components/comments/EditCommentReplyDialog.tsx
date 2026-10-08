"use client";

import { useState } from "react";
import { Button } from "@/frontend/components/ui/button";
import { Textarea } from "@/frontend/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/frontend/components/ui/dialog";

import { useUpdateCommentReply } from "@/frontend/features/posts/hooks/comments/comments-replies/use-update-comment-reply";
import { FormMessage } from "@/frontend/components/feedback/form-message";
import { Loader2, Pencil } from "lucide-react";

type EditCommentReplyDialogProps = {
  replyId: string;
  commentId: string;
  content: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EditCommentReplyDialog({
  replyId,
  commentId,
  content,
  open,
  onOpenChange,
}: EditCommentReplyDialogProps) {
  const [value, setValue] = useState(content);

  const updateMutation = useUpdateCommentReply();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedContent = value.trim();

    if (!trimmedContent || trimmedContent === content) {
      return;
    }

    updateMutation.mutate(
      {
        replyId,
        commentId,
        content: trimmedContent,
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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit reply</DialogTitle>

          <DialogDescription>
            Update your reply and save the changes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={value}
            onChange={(event) => setValue(event.target.value)}
            rows={4}
            placeholder="Write your reply..."
            disabled={updateMutation.isPending}
          />

          {updateMutation.isError && (
            <p className="text-sm text-destructive">
              {updateMutation.error.message || "Failed to update reply."}
            </p>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={updateMutation.isPending}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={
                updateMutation.isPending ||
                !value.trim() ||
                value.trim() === content
              }
            >
              <FormMessage
                icon={
                  updateMutation.isPending ? (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  ) : (
                    <Pencil className="mr-2 size-4" />
                  )
                }
                message={updateMutation.isPending ? "Editing..." : "Edit reply"}
                variant={updateMutation.isPending ? "info" : "success"}
              />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
