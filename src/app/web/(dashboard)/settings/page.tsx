"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/frontend/components/ui/dropdown-menu";

import { ThemeSelect } from "@/frontend/components/common/ThemeSelect";
import { CategorySelect } from "@/frontend/components/common/category-select";
import { useState } from "react";

export default function BookingsPage() {
  const [categoryId, setCategoryId] = useState<string | null>(null);

  const handleCategoryChange = (id: string | null) => {
    setCategoryId(id);
  };

  return (
    <main className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Settings</h1>

          <p className="text-muted-foreground">
            Manage your application preferences.
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground inline-flex h-9 items-center justify-center gap-2 rounded-md border px-4 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Appearance
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <div className="px-2 py-1.5 text-sm font-semibold">Color theme</div>

            <DropdownMenuSeparator />

            <div className="p-2">
              <ThemeSelect />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <CategorySelect
          value={categoryId}
          onChange={handleCategoryChange}
          placeholder="Choose a category"
        />
      </div>

      {/* Optional: show current selection on screen too */}
      <div className="text-sm text-muted-foreground">
        Current selected category ID:{" "}
        <span className="font-mono">{categoryId ?? "none"}</span>
      </div>
    </main>
  );
}
