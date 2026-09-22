import { z } from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(150, "Title must be 150 characters or less"),

  content: z.string().trim().min(1, "Content is required"),

  categoryId: z.uuid("Invalid category").nullable().optional(),

  images: z.array(z.string().url("Invalid image URL")).default([]),
});

export const updatePostSchema = createPostSchema.partial();

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
