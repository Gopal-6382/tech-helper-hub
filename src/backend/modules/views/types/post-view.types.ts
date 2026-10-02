import { isIP } from "node:net";
import { z } from "zod";

export const postViewParamsSchema = z.object({
  postId: z.uuid("Invalid post ID."),
});

export const createPostViewDtoSchema = z.object({
  postId: z.uuid("Invalid post ID."),
  userId: z.uuid("Invalid user ID."),
  ipAddress: z
    .string()
    .refine((value) => isIP(value) > 0, {
      message: "Invalid IP address.",
    })
    .nullish(),
});

export type CreatePostViewDto = z.infer<typeof createPostViewDtoSchema>;

export type PostViewResult = {
  success: boolean;
  message: string;
  alreadyViewed?: boolean;
};

