import { BookingStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

import { CreateBookingData, UpdateBookingDto } from "../types/booking.types";

export class BookingRepository {

  // Find one booking by booking ID with all related details
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

  // Find all bookings created by a user
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

  // Find all bookings assigned to a professional
  async findByProfessionalId(professionalId: string) {
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

  // Create a new booking
  async create(data: CreateBookingData) {
    return prisma.booking.create({
      data,
    });
  }

  // Update booking details
  async update(id: string, data: UpdateBookingDto) {
    return prisma.booking.update({
      where: {
        id,
      },
      data,
    });
  }

  // Update only the booking status
  async updateStatus(id: string, status: BookingStatus) {
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