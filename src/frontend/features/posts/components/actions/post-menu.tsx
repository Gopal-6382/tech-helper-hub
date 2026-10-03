"use client";

import { Flag, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/frontend/components/ui/dropdown-menu";

type PostMenuProps = {
  canEdit?: boolean;
  canDelete?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onReport?: () => void;
};

export function PostMenu({
  canEdit = true,
  canDelete = true,
  onEdit,
  onDelete,
  onReport,
}: PostMenuProps) {
  const hasEditAction = canEdit && !!onEdit;
  const hasDeleteAction = canDelete && !!onDelete;
  const hasReportAction = !!onReport;

  const hasAnyAction = hasEditAction || hasDeleteAction || hasReportAction;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-foreground transition-colors outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Post menu"
      >
        <MoreHorizontal className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        {hasEditAction && (
          <DropdownMenuItem onClick={onEdit}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
        )}

        {hasDeleteAction && (
          <DropdownMenuItem onClick={onDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        )}

        {(hasEditAction || hasDeleteAction) && hasReportAction && (
          <DropdownMenuSeparator />
        )}

        {hasReportAction && (
          <DropdownMenuItem onClick={onReport}>
            <Flag className="mr-2 h-4 w-4" />
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
