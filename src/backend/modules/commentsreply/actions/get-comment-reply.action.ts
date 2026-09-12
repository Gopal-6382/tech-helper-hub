import { CommentReplyService } from "../services/comment-reply.service";

const commentReplyService = new CommentReplyService();

export async function getCommentReply(id: string) {
  const result = await commentReplyService.getReply(id);

  return result;
}
