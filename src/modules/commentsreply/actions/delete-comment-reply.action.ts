import { NextResponse } from "next/server";

import { CommentReplyService } from "../services/comment-reply.service";

const commentReplyService = new CommentReplyService();
import { JwtPayload } from "@/lib/auth";

export async function deleteCommentReply(id: string, user: JwtPayload) {
  const result = await commentReplyService.deleteReply(id, user.userId);

  return NextResponse.json(result);
}
