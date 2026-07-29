import { CommentService } from "../services/comment-reply.service";

const commentService = new CommentService();

export async function getComments(postId: string) {
  return commentService.getComments(postId);
}