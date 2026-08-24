import { CommentService } from "../services/comment.service";
import { UpdateCommentDto } from "../types/comment.types";

const commentService = new CommentService();

export async function updateComment(
  user: string,
  id: string,
  data: UpdateCommentDto
) {

  const result = await commentService.updateComment(id, user, data);

  return result;
}
