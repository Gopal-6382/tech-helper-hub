"use client";

import  { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Power,
  Search,
  Loader2,
  AlertCircle,
  Folder,
} from "lucide-react";
import {
  useCategories,
  useToggleCategoryStatus,
  useDeleteCategory,
} from "../hooks/use-categories";
import { CategoryFormDialog } from "./category-form-dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Category {
  id: string;
  name: string;
  slug?: string;
  isActive: boolean;
  icon?: string | null;
}

interface SelectedCategory {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
}

export function CategoryManager() {
  const [includeInactive, setIncludeInactive] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<SelectedCategory | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const {
    data: categories = [],
    isLoading,
    isError,
    error,
  } = useCategories(includeInactive);
  
  const toggleStatusMutation = useToggleCategoryStatus();
  const deleteMutation = useDeleteCategory();

  const handleOpenCreate = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (category: Category) => {
    setSelectedCategory({
      id: category.id,
      name: category.name,
      slug: category.slug ?? "",
      icon: category.icon,
    });
    setIsModalOpen(true);
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    setActionError(null);
    try {
      await toggleStatusMutation.mutateAsync({ id, isActive: currentStatus });
    } catch (err: unknown) {
      setActionError(
        err instanceof Error ? err.message : "Failed to update category status",
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    setActionError(null);
    try {
      await deleteMutation.mutateAsync(id);
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : "Cannot delete category");
    }
  };

  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cat.slug?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false),
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-6">
      {/* Header & Main Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
          <p className="text-sm text-muted-foreground">
            Manage post categories, system slugs, and active display statuses.
          </p>
        </div>
        <Button onClick={handleOpenCreate} className="shrink-0">
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>

      {/* Action Error Alert */}
      {actionError && (
        <div className="flex items-center gap-2 p-3 text-sm rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{actionError}</span>
        </div>
      )}

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-card p-4 rounded-xl border">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <label className="flex items-center gap-2 text-sm font-medium cursor-pointer self-end sm:self-center">
          <input
            type="checkbox"
            checked={includeInactive}
            onChange={(e) => setIncludeInactive(e.target.checked)}
            className="rounded border-input text-primary focus:ring-ring"
          />
          Show Deactivated
        </label>
      </div>

      {/* Data Table */}
      <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : isError ? (
          <div className="p-8 text-center text-destructive">
            Failed to load categories: {error?.message}
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            <Folder className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No categories found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 border-b text-xs font-semibold uppercase text-muted-foreground">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Slug</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredCategories.map((category) => (
                  <tr
                    key={category.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium flex items-center gap-2">
                      <Folder className="h-4 w-4 text-primary" />
                      {category.name}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                      {category.slug}
                    </td>
                    <td className="px-6 py-4">
                      {category.isActive ? (
                        <Badge
                          variant="default"
                          className="bg-emerald-600 hover:bg-emerald-700"
                        >
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Inactive</Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleToggleActive(category.id, category.isActive)
                        }
                        title={category.isActive ? "Deactivate" : "Activate"}
                      >
                        <Power
                          className={`h-4 w-4 ${category.isActive ? "text-emerald-600" : "text-muted-foreground"}`}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenEdit(category)}
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(category.id)}
                        title="Delete"
                        className="hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Form Modal */}
      <CategoryFormDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={selectedCategory}
      />
    </div>
  );
}