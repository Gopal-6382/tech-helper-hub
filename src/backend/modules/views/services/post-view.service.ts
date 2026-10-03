import { postViewRepository } from "../repositories/post-view.repository";

import type {
  CreatePostViewDto,
  PostViewResult,
} from "../types/post-view.types";

export const postViewService = {
  async recordPostView(
    payload: CreatePostViewDto,
  ): Promise<PostViewResult> {
    /**
     * Check that the post exists and get its author.
     */
    const post = await postViewRepository.findPostForView(
      payload.postId,
    );

    if (!post) {
      return {
        success: false,
        message: "Post not found.",
      };
    }

    /**
     * Do not count the post author's own view.
     */
    if (post.authorId === payload.userId) {
      return {
        success: true,
        message: "Author view is not counted.",
        counted: false,
        isAuthor: true,
        viewCount: post.viewCount,
      };
    }

    /**
     * Repository handles:
     *
     * - unique view creation
     * - duplicate detection
     * - viewCount increment
     */
    const result =
      await postViewRepository.createViewAndIncrementCount(
        payload,
      );

    /**
     * Existing view.
     */
    if (!result.counted) {
      return {
        success: true,
        message: "Post view already recorded.",
        counted: false,
        alreadyViewed: true,
        viewCount: result.viewCount,
      };
    }

    /**
     * New unique view.
     */
    return {
      success: true,
      message: "Post view recorded.",
      counted: true,
      alreadyViewed: false,
      viewCount: result.viewCount,
    };
  },
};