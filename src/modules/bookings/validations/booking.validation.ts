import { z } from "zod";

export const createBookingSchema = z.object({
  serviceRequestId: z.uuid(),
  professionalId: z.uuid(),
});

export const updateBookingSchema = z.object({
  scheduledAt: z.coerce.date().optional(),
  amount: z.number().positive().optional(),
  cancelReason: z.string().trim().optional(),
});