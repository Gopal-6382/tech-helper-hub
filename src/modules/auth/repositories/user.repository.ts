import { prisma } from "../../../lib/prisma";
import { RegisterUserDto } from "../types/auth.types";

export class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: RegisterUserDto) {
    return prisma.user.create({
      data,
    });
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string | null,
  ) {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken,
      },
    });
  }
}