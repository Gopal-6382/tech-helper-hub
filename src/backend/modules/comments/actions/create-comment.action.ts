import { CommentService } from "../services/comment.service";
import { CreateCommentDto } from "../types/comment.types";

const commentService = new CommentService();

export async function createComment(user: string, data: CreateCommentDto) {
  return await commentService.createComment(user, data);
}
