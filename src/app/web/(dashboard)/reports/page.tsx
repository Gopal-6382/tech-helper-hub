"use client";

import { CategorySelect } from "@/frontend/components/common/category-select";
import { useState } from "react";

export default function BookingsPage() {
  const [categoryId, setCategoryId] = useState<string | null>(null);

  return (
    <main className="space-y-6 p-6">
      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <CategorySelect
          value={categoryId}
          onChange={setCategoryId}
          placeholder="Choose a category"
        />
      </div>

      <div className="text-sm text-muted-foreground">
        Current selected category ID:{" "}
        <span className="font-mono">{categoryId ?? "none"}</span>
      </div>
    </main>
  );
}
