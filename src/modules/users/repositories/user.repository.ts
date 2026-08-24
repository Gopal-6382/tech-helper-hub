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

  async delete(userId: string) {
    return prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
