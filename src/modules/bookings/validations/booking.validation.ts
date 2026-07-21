import { BookingStatus } from "@prisma/client";
import { z } from "zod";

export const createBookingSchema = z.object({
  serviceRequestId: z.uuid(),
  professionalId: z.uuid(),
});

export const updateBookingSchema = z.object({
  scheduledAt: z.coerce.date().optional(),
  status: z.enum(BookingStatus).optional(),
});

export const bookingStatusSchema = z.object({
  status: z.enum(BookingStatus),
});
