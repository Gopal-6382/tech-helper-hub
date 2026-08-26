"use me server";

import { CategoryService } from "../services/categories.service";
import {
  createCategorySchema,
  CreateCategoryInput,
  updateCategorySchema,
  UpdateCategoryInput,
} from "../validations/categories.validation";

const categoryService = new CategoryService();

export async function createCategoryAction(data: CreateCategoryInput) {
  const parsed = createCategorySchema.parse(data);
  const category = await categoryService.createCategory(parsed);
  return { success: true, data: category };
}

export async function updateCategoryAction(
  id: string,
  data: UpdateCategoryInput,
) {
  const parsed = updateCategorySchema.parse(data);
  const category = await categoryService.updateCategory(id, parsed);
  return { success: true, data: category };
}

export async function deleteCategoryAction(id: string) {
  await categoryService.deleteCategory(id);
  return { success: true };
}
