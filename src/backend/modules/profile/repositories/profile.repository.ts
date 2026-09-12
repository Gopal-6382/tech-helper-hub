import { prisma } from "@/lib/prisma";
import { CreateProfileDto, UpdateProfileDto } from "../types/profile.types";

export class ProfileRepository {
  async create(userId: string, data: CreateProfileDto) {
    return prisma.profile.create({
      data: {
        userId,
        ...data,
      },
    });
  }

  async findByUserId(userId: string) {
    return prisma.profile.findUnique({
      where: {
        userId,
      },
    });
  }

  async update(userId: string, data: UpdateProfileDto) {
    return prisma.profile.update({
      where: {
        userId,
      },
      data,
    });
  }
}
