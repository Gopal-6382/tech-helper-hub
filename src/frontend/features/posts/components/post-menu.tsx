"use client";

import { Flag, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/frontend/components/ui/button";
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
  canEdit = false,
  canDelete = false,
  onEdit,
  onDelete,
  onReport,
}: PostMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Post menu"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        }
      />

      <DropdownMenuContent align="end">
        {canEdit && onEdit && (
          <DropdownMenuItem onClick={onEdit}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
        )}

        {canDelete && onDelete && (
          <DropdownMenuItem onClick={onDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        )}

        {(canEdit || canDelete) && onReport && <DropdownMenuSeparator />}

        {onReport && (
          <DropdownMenuItem onClick={onReport}>
            <Flag className="mr-2 h-4 w-4" />
            Report
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
