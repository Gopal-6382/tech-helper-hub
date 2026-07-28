import { PostLikeRepository } from "../repositories/post-like.repository";

export class PostLikeService {
  private postLikeRepository = new PostLikeRepository();

  // Like a post
  async likePost(
    postId: string,
    userId: string,
  ) {
    const existing =
      await this.postLikeRepository.findLike(
        postId,
        userId,
      );

    if (existing) {
      throw new Error("Post already liked");
    }

    return this.postLikeRepository.create({
      postId,
      userId,
    });
  }

  // Unlike a post
  async unlikePost(
    postId: string,
    userId: string,
  ) {
    const existing =
      await this.postLikeRepository.findLike(
        postId,
        userId,
      );

    if (!existing) {
      throw new Error("Like not found");
    }

    return this.postLikeRepository.delete(
      postId,
      userId,
    );
  }

  // Get all likes of a post
  async getPostLikes(postId: string) {
    return this.postLikeRepository.findByPost(
      postId,
    );
  }

  // Count likes
  async getLikeCount(postId: string) {
    return this.postLikeRepository.count(
      postId,
    );
  }
}