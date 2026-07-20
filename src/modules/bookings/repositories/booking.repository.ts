import { BookingStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

import {
  CreateBookingData,
  UpdateBookingDto,
} from "../types/booking.types";

export class BookingRepository {
  async findById(id: string) {
    return prisma.booking.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        professional: {
          include: {
            user: true,
          },
        },
        serviceRequest: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async findByUserId(userId: string) {
    return prisma.booking.findMany({
      where: {
        userId,
      },
      include: {
        professional: {
          include: {
            user: true,
          },
        },
        serviceRequest: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findByProfessionalId(
    professionalId: string,
  ) {
    return prisma.booking.findMany({
      where: {
        professionalId,
      },
      include: {
        user: true,
        serviceRequest: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async create(data: CreateBookingData) {
    return prisma.booking.create({
      data,
    });
  }

  async update(
    id: string,
    data: UpdateBookingDto,
  ) {
    return prisma.booking.update({
      where: {
        id,
      },
      data,
    });
  }

  async updateStatus(
    id: string,
    status: BookingStatus,
  ) {
    return prisma.booking.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }
}