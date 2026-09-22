import { PostStatus } from "@prisma/client";

import { PostRepository } from "../repositories/post.repository";

import type {
  CreatePostData,
  UpdatePostDto,
} from "../types/post.types";

export class PostService {
  private postRepository = new PostRepository();

  // --------------------------------------------------
  // Create post
  //
  // Business rule:
  // Logged-in user becomes the author.
  // Client does not provide authorId.
  // Location comes from user's profile in the API layer/service flow.
  // status defaults to OPEN.
  // viewCount defaults to 0.
  // --------------------------------------------------
  async createPost(data: CreatePostData) {
    return this.postRepository.create({
      authorId: data.authorId,
      categoryId: data.categoryId,
      title: data.title,
      content: data.content,
      images: data.images ?? [],
    });
  }

  // --------------------------------------------------
  // Get one post
  //
  // Business rule:
  // Post must exist.
  // --------------------------------------------------
  async getPost(id: string) {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  }

  // --------------------------------------------------
  // Get all posts
  //
  // Public feed.
  // Latest posts first.
  // --------------------------------------------------
  async getPosts() {
    return this.postRepository.findAll();
  }

  // --------------------------------------------------
  // Get logged-in user's posts
  // --------------------------------------------------
  async getMyPosts(authorId: string) {
    return this.postRepository.findByAuthorId(authorId);
  }

  // --------------------------------------------------
  // Update post
  //
  // Business rule:
  // Only the author can edit.
  // Only editable fields are accepted by UpdatePostDto.
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

    return this.postRepository.update(id, data);
  }

  // --------------------------------------------------
  // Delete post
  //
  // Business rule:
  // Only the author can delete.
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
  // Update status
  //
  // Business rule:
  // Only the author can change post status.
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
  // Increase view count
  //
  // Business rule:
  // Post must exist.
  // --------------------------------------------------
  async increaseView(id: string) {
    await this.getPost(id);

    return this.postRepository.incrementView(id);
  }
}