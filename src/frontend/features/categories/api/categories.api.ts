import { apiRequest } from "@/frontend/lib/api";
import type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "@/admin/categories/validations/categories.validation";

export interface Category {
  id: string;
  name: string;
  slug?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export async function getCategories(
  includeInactive: boolean = true,
): Promise<Category[]> {
  const response = await apiRequest<Category[]>(
    `/api/categories?includeInactive=${includeInactive}`,
  );

  return response.data ?? [];
}

export async function createCategory(
  data: CreateCategoryInput,
): Promise<Category> {
  const response = await apiRequest<Category>("/api/categories", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.data) {
    throw new Error("Failed to create category");
  }

  return response.data;
}

export async function updateCategory(
  id: string,
  data: UpdateCategoryInput,
): Promise<Category> {
  const response = await apiRequest<Category>(`/api/categories/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

  if (!response.data) {
    throw new Error("Failed to update category");
  }

  return response.data;
}

export async function deleteCategory(id: string): Promise<void> {
  await apiRequest(`/api/categories/${id}`, {
    method: "DELETE",
  });
}

export async function activateCategory(id: string): Promise<Category> {
  const response = await apiRequest<Category>(`/api/categories/${id}/active`, {
    method: "PATCH",
  });

  if (!response.data) {
    throw new Error("Failed to activate category");
  }

  return response.data;
}

export async function deactivateCategory(id: string): Promise<Category> {
  const response = await apiRequest<Category>(
    `/api/categories/${id}/deactive`,
    {
      method: "PATCH",
    },
  );

  if (!response.data) {
    throw new Error("Failed to deactivate category");
  }

  return response.data;
}
