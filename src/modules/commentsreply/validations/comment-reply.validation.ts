import { z } from "zod";

export const createCommentReplySchema = z.object({
  commentId: z.uuid(),
  content: z
    .string()
    .trim()
    .min(1, "Content is required")
    .max(1000, "Content must be less than 1000 characters"),
});

export const updateCommentReplySchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Content is required")
    .max(1000, "Content must be less than 1000 characters"),
});

export type CreateCommentReplyDto = z.infer<typeof createCommentReplySchema>;

export type UpdateCommentReplyDto = z.infer<typeof updateCommentReplySchema>;
