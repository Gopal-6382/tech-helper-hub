import { BookingStatus } from "@prisma/client";

export interface CreateBookingDto {
  serviceRequestId: string;
  professionalId: string;
}

export interface CreateBookingData {
  serviceRequestId: string;
  professionalId: string;
  userId: string;
}

export interface UpdateBookingDto {
  scheduledAt?: Date;
  amount?: number;
  cancelReason?: string;
  status?: BookingStatus;
  acceptedAt?: Date | null;
}

export interface BookingStatusDto {
  status: BookingStatus;
  acceptedAt: Date | null;
}
