import { PostStatus } from "@prisma/client";

import { PostRepository } from "../repositories/post.repository";

import type {
  CreatePostData,
  UpdatePostInput,
} from "../validations/post.validation";

export class PostService {
  private postRepository = new PostRepository();

  // --------------------------------------------------
  // Create post
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
  // --------------------------------------------------

  async updatePost(id: string, authorId: string, data: UpdatePostInput) {
    const post = await this.getPost(id);

    if (post.authorId !== authorId) {
      throw new Error("You can only update your own post");
    }

    return this.postRepository.update(id, data);
  }

  // --------------------------------------------------
  // Delete post
  // --------------------------------------------------

  async deletePost(id: string, authorId: string) {
    const post = await this.getPost(id);

    if (post.authorId !== authorId) {
      throw new Error("You can only delete your own post");
    }

    return this.postRepository.delete(id);
  }

  // --------------------------------------------------
  // Update status
  // --------------------------------------------------

  async updateStatus(id: string, authorId: string, status: PostStatus) {
    const post = await this.getPost(id);

    if (post.authorId !== authorId) {
      throw new Error("You can only update your own post");
    }

    return this.postRepository.updateStatus(id, status);
  }

  // --------------------------------------------------
  // Increase view count
  // --------------------------------------------------

  async increaseView(id: string) {
    await this.getPost(id);

    return this.postRepository.incrementView(id);
  }
}
