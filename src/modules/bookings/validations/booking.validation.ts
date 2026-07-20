import { BookingStatus } from "@prisma/client";
import { z } from "zod";

export const createBookingSchema = z.object({
  serviceRequestId: z.string().cuid(),
  professionalId: z.string().cuid(),
});

export const updateBookingSchema = z.object({
  scheduledAt: z.coerce.date().optional(),

  status: z
    .nativeEnum(BookingStatus)
    .optional(),
});

export const bookingStatusSchema = z.object({
  status: z.nativeEnum(BookingStatus),
});