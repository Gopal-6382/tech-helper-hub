"use client";

import { useState } from "react";
import { Loader2, Pencil } from "lucide-react";

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

import { useUpdateComment } from "@/frontend/features/posts/hooks/comments/use-update-comment";

type EditCommentDialogProps = {
  commentId: string;
  postId: string;
  content: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EditCommentDialog({
  commentId,
  postId,
  content,
  open,
  onOpenChange,
}: EditCommentDialogProps) {
  const [value, setValue] = useState(content);

  const updateMutation = useUpdateComment();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedContent = value.trim();

    if (!trimmedContent || trimmedContent === content) {
      return;
    }

    updateMutation.mutate(
      {
        commentId,
        postId,
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
          <DialogTitle>Edit comment</DialogTitle>

          <DialogDescription>
            Update your comment and save the changes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={value}
            onChange={(event) => setValue(event.target.value)}
            rows={4}
            placeholder="Write your comment..."
            disabled={updateMutation.isPending}
          />

          {updateMutation.isError && (
            <p className="text-sm text-destructive">
              {updateMutation.error.message || "Failed to update comment."}
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
              {updateMutation.isPending ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : (
                <Pencil className="mr-2 size-4" />
              )}

              {updateMutation.isPending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
