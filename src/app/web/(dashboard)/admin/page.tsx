// src/app/dashboard/categories/page.tsx

import { CategoryManager } from "@/features/categories/components/category-manager";

export const metadata = {
  title: "Category Management",
  description: "Manage system categories, slugs, and active states.",
};

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-background py-8">
      <CategoryManager />
    </main>
  );
}
