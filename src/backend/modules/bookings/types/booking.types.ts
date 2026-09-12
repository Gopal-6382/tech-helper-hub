import { BookingStatus } from "@prisma/client";
export interface UpdateBookingDto {
  scheduledAt?: Date;
  amount?: number;
  cancelReason?: string;
  status?: BookingStatus;
  acceptedAt?: Date | null;
}

export type CreateBookingData = {
  serviceRequestId: string;
  userId: string;
  professionalId: string;
  amount: number;
  scheduledAt: Date;
};
