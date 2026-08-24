import { CommentService } from "../services/comment.service";

const commentService = new CommentService();

export async function deleteComment(user: string, id: string) {
  const result = await commentService.deleteComment(id, user);

  return result;
}
