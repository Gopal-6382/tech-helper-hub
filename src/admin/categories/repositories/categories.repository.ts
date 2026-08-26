import { prisma } from "@/lib/prisma";
import {
  CreateCategoryInput,
  updatecategory,
  UpdateCategoryInput,
} from "../validations/categories.validation";
export class CategoryRepository {
  async create(data: CreateCategoryInput) {
    return prisma.category.create({ data });
  }

  async findById(id: string) {
    return prisma.category.findUnique({ where: { id } });
  }

  async findByNameOrSlug(name?: string, slug?: string) {
    const conditions: updatecategory[] = [];

    if (name) conditions.push({ name });
    if (slug) conditions.push({ slug });

    if (conditions.length === 0) return null;

    return prisma.category.findFirst({
      where: {
        OR: conditions,
      },
    });
  }
  
// category.repository.ts

async findAll(includeInactive: boolean = true) {
  return prisma.category.findMany({
    where: { isActive: includeInactive }, 
    orderBy: { name: "asc" },
  });
}

  async update(id: string, data: UpdateCategoryInput) {
    return prisma.category.update({
      where: { id },
      data,
    });
  }

  async hasRelations(id: string): Promise<boolean> {
    const category = await prisma.category.findUnique({
      where: { id },
      select: {
        _count: {
          select: {
            professionals: true,
            requests: true,
            posts: true,
          },
        },
      },
    });

    if (!category) return false;

    const { professionals = 0, requests = 0, posts = 0 } = category._count;
    return professionals > 0 || requests > 0 || posts > 0;
  }

  async delete(id: string) {
    return prisma.category.delete({ where: { id } });
  }
// Deactivate Category (Soft Delete)
  async deactivate(id: string) {
    return prisma.category.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
  }

  // Activate Category
  async activate(id: string) {
    return prisma.category.update({
      where: { id },
      data: {
        isActive: true,
      },
    });
  }
}
