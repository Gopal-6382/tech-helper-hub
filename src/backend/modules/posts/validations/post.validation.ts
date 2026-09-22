import { PostStatus } from "@prisma/client";
import { z } from "zod";

// --------------------------------------------------
// Create post
// --------------------------------------------------

export const createPostSchema = z.object({
  categoryId: z.uuid("Invalid category ID").nullable().optional(),

  title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters")
    .max(150, "Title is too long"),

  content: z
    .string()
    .trim()
    .min(10, "Content must be at least 10 characters")
    .max(5000, "Content is too long"),

  images: z.array(z.string()).default([]),
});

// --------------------------------------------------
// Update post
// --------------------------------------------------

export const updatePostSchema = createPostSchema.partial();

// --------------------------------------------------
// Update only post status
// --------------------------------------------------

export const updatePostStatusSchema = z.object({
  status: z.enum(PostStatus),
});

// --------------------------------------------------
// Types
// --------------------------------------------------

export type CreatePostInput = z.infer<typeof createPostSchema>;

export type UpdatePostInput = z.infer<typeof updatePostSchema>;

export type UpdatePostStatusInput = z.infer<typeof updatePostStatusSchema>;

export interface CreatePostData extends CreatePostInput {
  authorId: string;
}
