import { z } from "zod";

export const createBookingSchema = z.object({
  serviceRequestId: z.uuid("Invalid service request ID"),
  amount: z.number().positive("Amount must be greater than 0"),
  scheduledAt: z.coerce.date(),
});

export type CreateBookingDto = z.infer<typeof createBookingSchema>;
