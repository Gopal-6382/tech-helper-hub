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
  const { categoryIds, ...profileData } = data;

  // 1. Fetch current roles to avoid duplicate "PROFESSIONAL" entries
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { roles: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // 2. Add PROFESSIONAL role if not already present
  const updatedRoles = user.roles.includes(Role.PROFESSIONAL)
    ? user.roles
    : [...user.roles, Role.PROFESSIONAL];

  // 3. Update User and Create Professional Profile in a single transaction
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      roles: updatedRoles,
      professionalProfile: {
        create: {
          ...profileData,
          categories: {
            create: categoryIds.map((categoryId) => ({
              category: {
                connect: { id: categoryId },
              },
            })),
          },
        },
      },
    },
    include: {
      professionalProfile: {
        include: {
          categories: {
            include: {
              category: true,
            },
          },
        },
      },
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
