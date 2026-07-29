import { z } from "zod";

export const createPostLikeSchema = z.object({
  postId: z.uuid(),
});

export type CreatePostLikeDto = z.infer<typeof createPostLikeSchema>;
