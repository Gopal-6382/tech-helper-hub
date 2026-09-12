import { VerificationStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

import {
  CreateVerificationDto,
  UpdateVerificationDto,
} from "../types/verification.types";

export class VerificationRepository {
  async findByUserId(userId: string) {
    return prisma.verification.findUnique({
      where: {
        userId,
      },
    });
  }

  async create(userId: string, data: CreateVerificationDto) {
    return prisma.verification.create({
      data: {
        userId,
        ...data,

        // Temporary
        status: VerificationStatus.VERIFIED,
        verifiedAt: new Date(),
      },
    });
  }

  async update(userId: string, data: UpdateVerificationDto) {
    return prisma.verification.update({
      where: {
        userId,
      },
      data,
    });
  }
}
