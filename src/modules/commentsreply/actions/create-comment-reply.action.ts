import { NextResponse } from "next/server";

import { CommentReplyService } from "../services/comment-reply.service";
import { createCommentReplySchema } from "../validations/comment-reply.validation";

const commentReplyService = new CommentReplyService();

export async function createCommentReply(
  request: Request,
  user: { userId: string },
) {
  const body = await request.json();

  const data = createCommentReplySchema.parse(body);

  const result =
    await commentReplyService.createReply({
      ...data,
      authorId: user.userId,
    });

  return NextResponse.json(result);
}