import { CommentReplyService } from "../services/comment-reply.service";
import { CreateCommentReplyData } from "../types/comment-reply.types";

const commentReplyService = new CommentReplyService();

export async function createCommentReply(
  userId: string,
  data: CreateCommentReplyData,
) {
  return commentReplyService.createReply({
    ...data,
    authorId: userId,
  });
}
