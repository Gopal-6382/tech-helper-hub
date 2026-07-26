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
        requester: {
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
        requesterId: userId,
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
        requester: {
          connect: {
            id: userId,
          },
        },
        category: {
          connect: {
            id: data.categoryId,
          },
        },

        title: data.title,
        description: data.description,
        images: data.images,
        mode: data.mode,
        budget: data.budget,
        address: data.address,
        city: data.city,
        latitude: data.latitude,
        longitude: data.longitude,
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
