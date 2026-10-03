import { z } from "zod";

/**
 * Input required to record a post view.
 *
 * userId is supplied by the authenticated server user,
 * not trusted from the browser.
 */
export const createPostViewDtoSchema = z.object({
  postId: z.uuid(),
  userId: z.uuid(),
});

export type CreatePostViewDto = z.infer<typeof createPostViewDtoSchema>;

export type PostViewResult =
  | {
      success: false;
      message: string;
    }
  | {
      success: true;
      message: string;
      counted: boolean;
      alreadyViewed?: boolean;
      isAuthor?: boolean;
      viewCount: number;
    };
