import { CommentService } from "../services/comment.service";

const commentService = new CommentService();

export async function getComment(id: string) {
  return await commentService.getComment(id);
}
