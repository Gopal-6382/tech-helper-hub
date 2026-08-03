import { PostRepository } from "@/modules/posts/repositories/post.repository";

import { SavedPostRepository } from "../repositories/saved-post.repository";
import { CreateSavedPostDto } from "../types/saved-post.types";

export class SavedPostService {
  private savedPostRepository = new SavedPostRepository();

  private postRepository = new PostRepository();

  async savePost(userId: string, data: CreateSavedPostDto) {
    const post = await this.postRepository.findById(data.postId);

    if (!post) {
      throw new Error("Post not found");
    }

    const existing = await this.savedPostRepository.findByUserAndPost(
      userId,
      data.postId,
    );

    if (existing) {
      throw new Error("Post already saved");
    }

    return this.savedPostRepository.create({
      userId,
      postId: data.postId,
    });
  }

  async unsavePost(userId: string, postId: string) {
    const existing = await this.savedPostRepository.findByUserAndPost(
      userId,
      postId,
    );

    if (!existing) {
      throw new Error("Saved post not found");
    }

    return this.savedPostRepository.delete(userId, postId);
  }

  async getSavedPosts(userId: string) {
    return this.savedPostRepository.findByUser(userId);
  }
}
