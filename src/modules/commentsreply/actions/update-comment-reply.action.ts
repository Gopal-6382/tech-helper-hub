import { NextResponse } from "next/server";

import { CommentReplyService } from "../services/comment-reply.service";
import { updateCommentReplySchema } from "../validations/comment-reply.validation";
import {JwtPayload} from "@/lib/auth";
const commentReplyService = new CommentReplyService();

export async function updateCommentReply(
  request: Request,
  user: JwtPayload,
  id: string,
) {
  const body = await request.json();

  const data = updateCommentReplySchema.parse(body);

  const result = await commentReplyService.updateReply(id, user.userId, data);

  return NextResponse.json(result);
}
