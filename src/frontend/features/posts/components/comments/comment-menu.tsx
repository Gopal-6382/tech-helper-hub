"use client";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/frontend/components/ui/dropdown-menu";

type CommentMenuProps = {
  onEdit?: () => void;
  onDelete?: () => void;
};

export function CommentMenu({ onEdit, onDelete }: CommentMenuProps) {
  const hasEditAction = Boolean(onEdit);
  const hasDeleteAction = Boolean(onDelete);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Comment menu"
      >
        <MoreHorizontal className="size-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-36">
        {hasEditAction && (
          <DropdownMenuItem onClick={onEdit}>
            <Pencil />
            Edit
          </DropdownMenuItem>
        )}

        {hasDeleteAction && (
          <DropdownMenuItem onClick={onDelete}>
            <Trash2 />
            Delete
          </DropdownMenuItem>
        )}

        {!hasEditAction && !hasDeleteAction && (
          <DropdownMenuItem disabled>No actions available</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
