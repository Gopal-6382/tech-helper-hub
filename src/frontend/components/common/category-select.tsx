// frontend/components/common/category-select.tsx
"use client";

import { useCategories } from "@/features/categories/hooks/use-categories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/frontend/components/ui/select";

interface CategorySelectProps {
  value?: string | null;
  onChange: (id: string | null) => void;
  placeholder?: string;
  includeInactive?: boolean;
  disabled?: boolean;
  className?: string;
  label?: string;
  error?: string;
}

export function CategorySelect({
  value,
  onChange,
  placeholder = "Select category",
  includeInactive = true,
  disabled = false,
  className,
  label,
  error,
}: CategorySelectProps) {
  const { data: categories = [], isLoading } = useCategories(includeInactive);

  return (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-foreground">
          {label}
        </label>
      )}

      <Select
        value={value ?? ""}
        onValueChange={(val: string | null) => {
          onChange(val);
        }}
        disabled={disabled || isLoading}
      >
        <SelectTrigger
          className={[
            "group relative flex h-10 w-full items-center justify-between",
            "rounded-md border border-input bg-background px-3 py-2 text-sm",
            "shadow-sm transition-all",
            "hover:border-foreground/30",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            error ? "border-destructive focus-visible:ring-destructive" : "",
            disabled ? "cursor-not-allowed opacity-60" : "",
            className || "",
          ].join(" ")}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent
          sideOffset={4}
          className="min-w-48 rounded-md border bg-popover text-popover-foreground shadow-lg"
        >
          {categories.length === 0 ? (
            <div className="px-2 py-1.5 text-sm text-muted-foreground">
              No categories
            </div>
          ) : (
            categories.map((cat) => (
              <SelectItem
                key={cat.id}
                value={cat.name}
                className="cursor-pointer px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground"
              >
                {cat.name}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>

      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}
