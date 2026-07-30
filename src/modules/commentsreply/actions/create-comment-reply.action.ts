import { NextResponse } from "next/server";

import { CommentReplyService } from "../services/comment-reply.service";
import { createCommentReplySchema } from "../validations/comment-reply.validation";
import {JwtPayload} from "@/lib/auth";
const commentReplyService = new CommentReplyService();

export async function createCommentReply(
  request: Request,
  user:JwtPayload,
) {
  const body = await request.json();

  const data = createCommentReplySchema.parse(body);

  const result = await commentReplyService.createReply({
    ...data,
    authorId: user.userId,
  });

  return NextResponse.json(result);
}
