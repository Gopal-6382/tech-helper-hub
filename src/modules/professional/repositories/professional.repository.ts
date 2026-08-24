import { prisma } from "@/lib/prisma";
import {
  BecomeProfessionalDto,
  UpdateProfessionalDto,
} from "../types/professional.types";
import { Role } from "@prisma/client";

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

  // In professional.repository.ts
  async create(userId: string, data: BecomeProfessionalDto) {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        roles: { push: Role.PROFESSIONAL },
        professionalProfile: {
          create: data,
        },
      },
      include: {
        professionalProfile: true,
      },
    });

    return updatedUser.professionalProfile;
  }

  async update(userId: string, data: UpdateProfessionalDto) {
    return prisma.professionalProfile.update({
      where: {
        userId,
      },
      data,
    });
  }

  async updateAvailability(userId: string, isAvailable: boolean) {
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
