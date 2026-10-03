import { prisma } from "@/backend/lib/prisma";

import type { CreatePostViewDto } from "../types/post-view.types";

export const postViewRepository = {
  /**
   * Get the minimum post data required by the service.
   */
  async findPostForView(postId: string) {
    return prisma.problemPost.findUnique({
      where: {
        id: postId,
      },
      select: {
        id: true,
        authorId: true,
        viewCount: true,
      },
    });
  },

  /**
   * Create a unique view and increment the cached post view count.
   *
   * The unique constraint:
   *
   *   @@unique([postId, userId])
   *
   * prevents the same user from creating multiple views
   * for the same post.
   */
  async createViewAndIncrementCount(
    payload: CreatePostViewDto,
  ) {
    return prisma.$transaction(async (tx) => {
      const result = await tx.postView.createMany({
        data: {
          postId: payload.postId,
          userId: payload.userId,
        },

        // PostgreSQL ignores the insert when the
        // (postId, userId) unique constraint already exists.
        skipDuplicates: true,
      });

      /**
       * User already viewed this post.
       *
       * Do not increment viewCount.
       */
      if (result.count === 0) {
        const post = await tx.problemPost.findUnique({
          where: {
            id: payload.postId,
          },
          select: {
            viewCount: true,
          },
        });

        return {
          counted: false,
          alreadyViewed: true,
          viewCount: post?.viewCount ?? 0,
        };
      }

      /**
       * New unique view.
       *
       * Increment the cached count only after the
       * PostView row has been created.
       */
      const post = await tx.problemPost.update({
        where: {
          id: payload.postId,
        },
        data: {
          viewCount: {
            increment: 1,
          },
        },
        select: {
          id: true,
          viewCount: true,
        },
      });

      return {
        counted: true,
        alreadyViewed: false,
        viewCount: post.viewCount,
      };
    });
  },
};