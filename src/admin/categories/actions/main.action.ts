"use server";

import { CategoryService } from "../services/categories.service";
import {
  CreateCategoryInput,
  updateCategorySchema,
  UpdateCategoryInput,
} from "../validations/categories.validation";

const categoryService = new CategoryService();

export async function createCategoryAction(data: CreateCategoryInput) {
  const category = await categoryService.createCategory(data);
  return category;
}

export async function updateCategoryAction(
  id: string,
  data: UpdateCategoryInput,
) {
  const parsed = updateCategorySchema.parse(data);
  return categoryService.updateCategory(id, parsed);
}

export async function deleteCategoryAction(id: string) {
  await categoryService.deleteCategory(id);
  return { message: "Category deleted successfully" };
}

export async function getCategoriesAction(includeInactive: boolean = true) {
  return categoryService.getCategories(includeInactive);
}

export async function deactivateCategoryAction(id: string) {
  return categoryService.deactivateCategory(id);
}

export async function activateCategoryAction(id: string) {
  return categoryService.activateCategory(id);
}
