import { PostLikeRepository } from "../repositories/post-like.repository";
import {
  CreatePostLikeData,
  PrismaKnownRequestError,
} from "../types/post-like.types";

export class PostLikeService {
  private postLikeRepository = new PostLikeRepository();

  async likePost(data: CreatePostLikeData) {
    try {
      return await this.postLikeRepository.create(data);
    } catch (err: unknown) {
      const error = err as PrismaKnownRequestError;

      if (error?.code === "P2003") {
        throw new Error("Post or User not found");
      }
      if (error?.code === "P2002") {
        throw new Error("Post already liked");
      }
      throw error;
    }
  }

  async unlikePost(postId: string, userId: string) {
    try {
      return await this.postLikeRepository.delete(postId, userId);
    } catch (err: unknown) {
      const error = err as PrismaKnownRequestError;

      if (error?.code === "P2025") {
        throw new Error("Like not found");
      }
      throw error;
    }
  }

  // Get list of users who liked the post
  async getPostLikes(postId: string) {
    return this.postLikeRepository.findByPost(postId);
  }

  // Check if a specific logged-in user has liked this post
  async hasUserLiked(postId: string, userId: string): Promise<boolean> {
    const like = await this.postLikeRepository.findLike(postId, userId);
    return Boolean(like);
  }
}
