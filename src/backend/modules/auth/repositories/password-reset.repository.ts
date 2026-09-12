import { prisma } from "@/lib/prisma";

export class PasswordResetRepository {
  async create(data: { userId: string; tokenHash: string; expiresAt: Date }) {
    return prisma.passwordResetToken.create({
      data,
    });
  }

  async findValidToken(tokenHash: string) {
    return prisma.passwordResetToken.findFirst({
      where: {
        tokenHash,
        usedAt: null,
        expiresAt: {
          gt: new Date(),
        },
      },
    });
  }

  async markAsUsed(id: string) {
    return prisma.passwordResetToken.update({
      where: {
        id,
      },
      data: {
        usedAt: new Date(),
      },
    });
  }

  async deleteUserTokens(userId: string) {
    return prisma.passwordResetToken.deleteMany({
      where: {
        userId,
      },
    });
  }
}
