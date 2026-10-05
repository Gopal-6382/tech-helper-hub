"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/frontend/components/ui/dialog";

import { ReportPostForm } from "@/frontend/features/posts/components/form/report-post-form";

type ReportPostDialogProps = {
  postId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ReportPostDialog({
  postId,
  open,
  onOpenChange,
}: ReportPostDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Report post</DialogTitle>

          <DialogDescription>
            Tell us why this post should be reviewed.
          </DialogDescription>
        </DialogHeader>

        <ReportPostForm postId={postId} onSuccess={() => onOpenChange(false)} />

        <DialogFooter>
          <DialogClose className="btn btn-outline">Cancel</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
