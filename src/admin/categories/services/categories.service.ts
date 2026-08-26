import { CategoryRepository } from "../repositories/categories.repository";
import { CreateCategoryInput, UpdateCategoryInput } from "../validations/categories.validation";

export class CategoryService {
  private categoryRepo = new CategoryRepository();

  async createCategory(input: CreateCategoryInput) {
    const existing = await this.categoryRepo.findByNameOrSlug(input.name, input.slug);
    if (existing) {
      throw new Error("Category with this name or slug already exists");
    }

    return this.categoryRepo.create({
      name: input.name,
      slug: input.slug,
      icon: input.icon,
    });
  }

  async getCategories(includeInactive = false) {
    return this.categoryRepo.findAll(!includeInactive);
  }

  async updateCategory(id: string, input: UpdateCategoryInput) {
    const category = await this.categoryRepo.findById(id);
    if (!category) {
      throw new Error("Category not found");
    }

    if (input.name || input.slug) {
      const duplicate = await this.categoryRepo.findByNameOrSlug(input.name, input.slug);
      if (duplicate && duplicate.id !== id) {
        throw new Error("Another category with this name or slug already exists");
      }
    }

    return this.categoryRepo.update(id, input);
  }

  async deleteCategory(id: string) {
    const category = await this.categoryRepo.findById(id);
    if (!category) {
      throw new Error("Category not found");
    }

    const isUsed = await this.categoryRepo.hasRelations(id);
    if (isUsed) {
      throw new Error("Cannot delete category because it is linked to existing data. Disable it instead.");
    }

    return this.categoryRepo.delete(id);
  }
}