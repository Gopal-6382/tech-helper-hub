"use client";

import { Loader2, Trash2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/frontend/components/ui/dialog";
import { Button } from "@/frontend/components/ui/button";

type ConfirmDeleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isPending?: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  loadingText?: string;
};

export function ConfirmDeleteDialog({
  open,
  onOpenChange,
  onConfirm,
  isPending = false,
  title = "Delete item?",
  description = "This action cannot be undone. This will permanently delete the item.",
  confirmText = "Delete",
  loadingText = "Deleting...",
}: ConfirmDeleteDialogProps) {
  const handleOpenChange = (nextOpen: boolean) => {
    if (isPending) return;

    onOpenChange(nextOpen);
  };

  const handleConfirm = () => {
    if (isPending) return;

    onConfirm();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>

          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            disabled={isPending}
            onClick={handleConfirm}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                {loadingText}
              </>
            ) : (
              <>
                <Trash2 className="mr-2 size-4" />
                {confirmText}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
