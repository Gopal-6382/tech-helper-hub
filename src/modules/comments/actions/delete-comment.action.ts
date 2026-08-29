import { CommentService } from "../services/comment.service";

const commentService = new CommentService();

export async function deleteComment(id: string, user: string) {
  return await commentService.deleteComment(id, user);
}
