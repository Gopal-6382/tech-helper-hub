import { postViewRepository } from "../repositories/post-view.repository";

import type {
  CreatePostViewDto,
  PostViewResult,
} from "../types/post-view.types";

export const postViewService = {
  async recordPostView(payload: CreatePostViewDto): Promise<PostViewResult> {
    const post = await postViewRepository.findPostById(payload.postId);

    if (!post) {
      return {
        success: false,
        message: "Post not found.",
      };
    }

    if (post.authorId === payload.userId) {
      return {
        success: true,
        message: "Author view is not counted.",
      };
    }

    const existingView = await postViewRepository.findViewByPostAndUser(
      payload.postId,
      payload.userId,
    );

    if (existingView) {
      return {
        success: true,
        message: "Post view already recorded.",
        alreadyViewed: true,
      };
    }

    await postViewRepository.createViewAndIncrementCount(payload);

    return {
      success: true,
      message: "Post view recorded.",
      alreadyViewed: false,
    };
  },
};
