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

  async create(data: RegisterUserDto) {
    return prisma.user.create({
      data,
    });
  }
}
