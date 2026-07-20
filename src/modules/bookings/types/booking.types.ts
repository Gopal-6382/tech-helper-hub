import { BookingStatus } from "@prisma/client";

export interface CreateBookingDto {
  serviceRequestId: string;
  professionalId: string;
}

export interface CreateBookingData extends CreateBookingDto {
  userId: string;
}

export interface UpdateBookingDto {
  scheduledAt?: Date;
  status?: BookingStatus;
}

export interface BookingStatusDto {
  status: BookingStatus;
}