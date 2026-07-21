import { RequestStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

import {
  CreateServiceRequestDto,
  UpdateServiceRequestDto,
} from "../types/service-request.types";

export class ServiceRequestRepository {
  async findById(id: string) {
    return prisma.serviceRequest.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
  }

  async findByUserId(userId: string) {
    return prisma.serviceRequest.findMany({
      where: {
        userId,
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async create(userId: string, data: CreateServiceRequestDto) {
    return prisma.serviceRequest.create({
      data: {
        userId,
        ...data,
      },
    });
  }

  async update(id: string, data: UpdateServiceRequestDto) {
    return prisma.serviceRequest.update({
      where: {
        id,
      },
      data,
    });
  }

  async cancel(id: string) {
    return prisma.serviceRequest.update({
      where: {
        id,
      },
      data: {
        status: RequestStatus.CANCELLED,
      },
    });
  }
}
