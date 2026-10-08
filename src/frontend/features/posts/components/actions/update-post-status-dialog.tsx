"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/frontend/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/frontend/components/ui/dialog";

import { RadioGroupField } from "@/frontend/components/form";

import { useUpdatePost } from "@/frontend/features/posts/hooks/interactions/use-post-status";

import type { PostStatus } from "@/frontend/features/posts/types/post.types";
import {
  UpdatePostStatusInput,
  updatePostStatusSchema,
} from "@/backend/modules/posts/validations/post.validation";

type UpdatePostStatusDialogProps = {
  postId: string;
  currentStatus: PostStatus;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const statusOptions = [
  {
    value: "OPEN",
    label: "Open",
  },
  {
    value: "SOLVED",
    label: "Solved",
  },
  {
    value: "CLOSED",
    label: "Closed",
  },
] satisfies Array<{
  value: PostStatus;
  label: string;
}>;

export function UpdatePostStatusDialog({
  postId,
  currentStatus,
  open,
  onOpenChange,
}: UpdatePostStatusDialogProps) {
  const updateMutation = useUpdatePost();

  const form = useForm<UpdatePostStatusInput>({
    resolver: zodResolver(updatePostStatusSchema),
    defaultValues: {
      status: currentStatus,
    },
  });

  const handleUpdate = form.handleSubmit((data) => {
    updateMutation.mutate(
      {
        postId,
        data: {
          status: data.status,
        },
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      },
    );
  });

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      form.reset({
        status: currentStatus,
      });
    }

    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update post status</DialogTitle>

          <DialogDescription>
            Choose the current status of your post.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleUpdate}>
          <div className="space-y-6">
            <RadioGroupField
              control={form.control}
              name="status"
              label="Status"
              options={statusOptions}
            />

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
                disabled={updateMutation.isPending || !form.formState.isDirty}
              >
                {updateMutation.isPending ? "Updating..." : "Update status"}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
