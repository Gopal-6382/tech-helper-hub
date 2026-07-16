import { z } from "zod";
import { ServiceMode } from "@prisma/client";

export const becomeProfessionalSchema = z.object({
  headline: z
    .string()
    .trim()
    .min(5, "Headline must be at least 5 characters")
    .max(100, "Headline cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description cannot exceed 1000 characters"),

  experienceYears: z
    .number()
    .int()
    .min(0)
    .max(50),

  hourlyRate: z
    .number()
    .positive(),

  serviceMode: z.nativeEnum(ServiceMode),

  workingRadiusKm: z
    .number()
    .int()
    .min(1)
    .max(100),
});

export const updateProfessionalSchema =
  becomeProfessionalSchema.partial().extend({
    isAvailable: z.boolean().optional(),
  });

export const updateProfessionalCategoriesSchema = z.object({
  categoryIds: z
    .array(z.string().cuid())
    .min(1, "Select at least one category"),
});