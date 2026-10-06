"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/frontend/components/ui/dialog";

import { IssueReportForm } from "./issue-report-form";

type IssueReportDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function IssueReportDialog({
  open,
  onOpenChange,
}: IssueReportDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Report an issue</DialogTitle>

          <DialogDescription>
            Tell us what went wrong so we can investigate it.
          </DialogDescription>
        </DialogHeader>

        <IssueReportForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
