import { NextResponse } from "next/server";

import { CommentReplyService } from "../services/comment-reply.service";

const commentReplyService = new CommentReplyService();

export async function deleteCommentReply(
  id: string,
  userId: string,
) {
  const result =
    await commentReplyService.deleteReply(
      id,
      userId,
    );

  return NextResponse.json(result);
}