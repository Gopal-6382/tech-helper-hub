import { prisma } from "@/lib/prisma";
import {
  BecomeProfessionalDto,
  UpdateProfessionalDto,
} from "../types/professional.types";

export class ProfessionalRepository {
  async findByUserId(userId: string) {
    return prisma.professionalProfile.findUnique({
      where: {
        userId,
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async create(
    userId: string,
    data: BecomeProfessionalDto,
  ) {
    return prisma.professionalProfile.create({
      data: {
        userId,
        ...data,
      },
    });
  }

  async update(
    userId: string,
    data: UpdateProfessionalDto,
  ) {
    return prisma.professionalProfile.update({
      where: {
        userId,
      },
      data,
    });
  }

  async updateAvailability(
    userId: string,
    isAvailable: boolean,
  ) {
    return prisma.professionalProfile.update({
      where: {
        userId,
      },
      data: {
        isAvailable,
      },
    });
  }

  async replaceCategories(
    professionalProfileId: string,
    categoryIds: string[],
  ) {
    await prisma.professionalCategory.deleteMany({
      where: {
        professionalProfileId,
      },
    });

    return prisma.professionalCategory.createMany({
      data: categoryIds.map((categoryId) => ({
        professionalProfileId,
        categoryId,
      })),
    });
  }
  async getCategories() {
    
  return prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

}