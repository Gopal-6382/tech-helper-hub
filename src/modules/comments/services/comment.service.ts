import { CommentRepository } from "../repositories/comment.repository";
import { PostRepository } from "@/modules/posts/repositories/post.repository";
import { CreateCommentDto, UpdateCommentDto } from "../types/comment.types";

export class CommentService {
  constructor(
    private commentRepository = new CommentRepository(),
    private postRepository = new PostRepository(),
  ) {}

  async createComment(authorId: string, data: CreateCommentDto) {
    const post = await this.postRepository.findById(data.postId);

    if (!post) {
      throw new Error("Post not found");
    }

    return this.commentRepository.create({
      ...data,
      authorId,
    });
  }

  async getComment(id: string) {
    const comment = await this.commentRepository.findById(id);

    if (!comment) {
      throw new Error("Comment not found");
    }

    return comment;
  }

  async getComments(postId: string, page = 1, limit = 10) {
    const post = await this.postRepository.findById(postId);

    if (!post) {
      throw new Error("Post not found");
    }

    const skip = (page - 1) * limit;

    const [comments, total] = await Promise.all([
      this.commentRepository.findByPostId(postId, skip, limit),
      this.commentRepository.countByPostId(postId),
    ]);

    return {
      comments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async updateComment(id: string, authorId: string, data: UpdateCommentDto) {
    const comment = await this.getComment(id);

    if (comment.authorId !== authorId) {
      throw new Error("You can only update your own comment");
    }

    return this.commentRepository.update(id, data);
  }

  async deleteComment(id: string, authorId: string) {
    const comment = await this.getComment(id);

    if (comment.authorId !== authorId) {
      throw new Error("You can only delete your own comment");
    }

    return this.commentRepository.delete(id);
  }
}
