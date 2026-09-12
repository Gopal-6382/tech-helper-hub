import { CommentReplyService } from "../services/comment-reply.service";

const commentReplyService = new CommentReplyService();

export async function deleteCommentReply(id: string, user: string) {
  const result = await commentReplyService.deleteReply(id, user);

  return result;
}
