import { CommentService } from "../services/comment.service";
import { UpdateCommentDto } from "../types/comment.types";

const commentService = new CommentService();

export async function updateComment(
  id: string,
  user: string,
  data: UpdateCommentDto,
) {
  return await commentService.updateComment(id, user, data);
}
