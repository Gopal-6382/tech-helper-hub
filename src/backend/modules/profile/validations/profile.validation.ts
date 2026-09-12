import { z } from "zod";

export const createProfileSchema = z.object({
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().min(1, "Pincode is required"),
  latitude: z.number(),
  longitude: z.number(),
});

export const updateProfileSchema = createProfileSchema.partial();

export type CreateProfileDto = z.infer<typeof createProfileSchema>;
export type UpdateProfileDto = z.infer<typeof updateProfileSchema>;
