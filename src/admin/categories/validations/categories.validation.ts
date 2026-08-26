import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(30, "Name cannot exceed 30 characters")
    .regex(/^[a-zA-Z\s]+$/, "Only letters and spaces allowed")
    .transform((val) => val.toUpperCase()), 

  icon: z.string().optional(),

  slug: z
    .string()
    .trim()
    .min(2, "Slug must be at least 2 characters")
    .max(30, "Slug cannot exceed 30 characters")
    .transform((val) => val.toLowerCase().replace(/\s+/g, "-")), 
});

export const updateCategorySchema = createCategorySchema.partial().extend({
  isActive: z.boolean().optional(),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export const UpdateCategory = createCategorySchema.partial();
export type updatecategory=z.infer<typeof UpdateCategory >;