import { prisma } from "@/lib/prisma";
import { UpdateMeDto } from "../types/user.types";

export class UserRepository {
  async findById(userId: string) {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findByPhone(phone: string) {
    return prisma.user.findUnique({
      where: {
        phone,
      },
    });
  }

  async update(userId: string, data: UpdateMeDto) {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });
  }

  async updatePassword(userId: string, hashedPassword: string) {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
        refreshToken: null,
      },
    });
  }

  async deactivate(userId: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { isActive: false },
    });
  }

  async activate(userId: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { isActive: true },
    });
  }

  async getActiveStatus(userId: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { isActive: true },
    });

    return user?.isActive ?? false;
  }
}
