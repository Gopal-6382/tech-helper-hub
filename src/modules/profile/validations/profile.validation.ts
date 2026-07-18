import { z } from "zod";

export const createProfileSchema = z.object({
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export const updateProfileSchema = createProfileSchema;
