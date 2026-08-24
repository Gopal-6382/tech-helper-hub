
import { CommentService } from "../services/comment.service";

const commentService = new CommentService();

export async function getComment(id: string) {
  const result = await commentService.getComment(id);

  return result;
}
