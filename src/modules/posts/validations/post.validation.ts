import { PostStatus } from "@prisma/client";
import { z } from "zod";

// --------------------------------------------------
// Validation for creating a new problem post.
//
// AuthorId is NOT validated here.
// It comes from JWT.
// --------------------------------------------------
export const createPostSchema = z.object({
  categoryId: z.string().uuid().optional(),

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

  city: z.string().trim().optional(),

  latitude: z.number().optional(),

  longitude: z.number().optional(),
});

// --------------------------------------------------
// Validation for updating a post.
//
// Every field is optional because user
// may update only one field.
// --------------------------------------------------
export const updatePostSchema = z.object({
  categoryId: z.string().uuid().optional(),

  title: z
    .string()
    .trim()
    .min(5)
    .max(150)
    .optional(),

  content: z
    .string()
    .trim()
    .min(10)
    .max(5000)
    .optional(),

  images: z.array(z.string()).optional(),

  city: z.string().trim().optional(),

  latitude: z.number().optional(),

  longitude: z.number().optional(),
});

// --------------------------------------------------
// Validation for changing only the post status.
// --------------------------------------------------
export const updatePostStatusSchema = z.object({
  status: z.nativeEnum(PostStatus),
});