import { z } from "zod";

export const createSavedPostSchema = z.object({
  postId: z.uuid("Invalid post id"),
});

export type CreateSavedPostDto = z.infer<typeof createSavedPostSchema>;
