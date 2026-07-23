import { PostStatus } from "@prisma/client";

import { PostRepository } from "../repositories/post.repository";

import {
  CreatePostDto,
  UpdatePostDto,
} from "../types/post.types";

export class PostService {
  private postRepository = new PostRepository();

  // --------------------------------------------------
  // Business Rule:
  // Logged-in user becomes the author.
  // Client cannot send authorId.
  // --------------------------------------------------
  async createPost(
    authorId: string,
    data: CreatePostDto,
  ) {
    return this.postRepository.create({
      ...data,
      authorId,
    });
  }

  // --------------------------------------------------
  // Business Rule:
  // Post must exist.
  // --------------------------------------------------
  async getPost(id: string) {
    const post =
      await this.postRepository.findById(id);

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  }

  // --------------------------------------------------
  // Feed
  // --------------------------------------------------
  async getPosts() {
    return this.postRepository.findAll();
  }

  // --------------------------------------------------
  // Logged in user's posts.
  // --------------------------------------------------
  async getMyPosts(authorId: string) {
    return this.postRepository.findByAuthorId(
      authorId,
    );
  }

  // --------------------------------------------------
  // Business Rule:
  // Only author can edit.
  // --------------------------------------------------
  async updatePost(
    id: string,
    authorId: string,
    data: UpdatePostDto,
  ) {
    const post = await this.getPost(id);

    if (post.authorId !== authorId) {
      throw new Error(
        "You can only update your own post",
      );
    }

    return this.postRepository.update(
      id,
      data,
    );
  }

  // --------------------------------------------------
  // Business Rule:
  // Only author can delete.
  // --------------------------------------------------
  async deletePost(
    id: string,
    authorId: string,
  ) {
    const post = await this.getPost(id);

    if (post.authorId !== authorId) {
      throw new Error(
        "You can only delete your own post",
      );
    }

    return this.postRepository.delete(id);
  }

  // --------------------------------------------------
  // Business Rule:
  // Only author changes status.
  // --------------------------------------------------
  async updateStatus(
    id: string,
    authorId: string,
    status: PostStatus,
  ) {
    const post = await this.getPost(id);

    if (post.authorId !== authorId) {
      throw new Error(
        "You can only update your own post",
      );
    }

    return this.postRepository.updateStatus(
      id,
      status,
    );
  }

  // --------------------------------------------------
  // Every time someone opens a post,
  // increase its view count.
  // --------------------------------------------------
  async increaseView(id: string) {
    await this.getPost(id);

    return this.postRepository.incrementView(
      id,
    );
  }
}