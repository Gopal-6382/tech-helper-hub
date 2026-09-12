import { CommentReplyService } from "../services/comment-reply.service";
import { UpdateCommentReplyData } from "../types/comment-reply.types";
const commentReplyService = new CommentReplyService();

export async function updateCommentReply(
  id: string,
  user: string,
  data: UpdateCommentReplyData,
) {
  const result = await commentReplyService.updateReply(id, user, data);

  return result;
}
