"use client";

import {
  Flag,
  MoreHorizontal,
  Pencil,
  Trash2,
  CircleCheck,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/frontend/components/ui/dropdown-menu";

import type { PostMenuProps } from "@/features/posts/types/post-action.types";

export function PostMenu({
  canEdit = false,
  canDelete = false,
  canUpdateStatus = false,
  onEdit,
  onDelete,
  onUpdateStatus,
  onReport,
}: PostMenuProps) {
  const hasEditAction = canEdit && Boolean(onEdit);
  const hasDeleteAction = canDelete && Boolean(onDelete);
  const hasStatusAction = canUpdateStatus && Boolean(onUpdateStatus);
  const hasReportAction = Boolean(onReport);

  const hasAnyAction =
    hasEditAction || hasDeleteAction || hasStatusAction || hasReportAction;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex size-9 items-center justify-center rounded-md border border-input bg-background text-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Post menu"
      >
        <MoreHorizontal className="size-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        {hasEditAction && (
          <DropdownMenuItem onClick={onEdit}>
            <Pencil />
            Edit
          </DropdownMenuItem>
        )}

        {hasStatusAction && (
          <DropdownMenuItem onClick={onUpdateStatus}>
            <CircleCheck />
            Update status
          </DropdownMenuItem>
        )}

        {hasDeleteAction && (
          <DropdownMenuItem onClick={onDelete}>
            <Trash2 />
            Delete
          </DropdownMenuItem>
        )}

        {(hasEditAction || hasStatusAction || hasDeleteAction) &&
          hasReportAction && <DropdownMenuSeparator />}

        {hasReportAction && (
          <DropdownMenuItem onClick={onReport}>
            <Flag />
            Report
          </DropdownMenuItem>
        )}

        {!hasAnyAction && (
          <DropdownMenuItem disabled>No actions available</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
