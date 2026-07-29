import { NextResponse } from "next/server";

import { CommentReplyService } from "../services/comment-reply.service";

const commentReplyService = new CommentReplyService();

export async function getCommentReplies(
  commentId: string,
) {
  const result =
    await commentReplyService.getReplies(commentId);

  return NextResponse.json(result);
}