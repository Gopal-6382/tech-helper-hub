import { z } from "zod";

export const createCommentSchema = z.object({
  postId: z.uuid("Invalid post id"),

  content: z
    .string()
    .trim()
    .min(1, "Comment is required")
    .max(1000, "Comment is too long"),
});

export const updateCommentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Comment is required")
    .max(1000, "Comment is too long"),
});