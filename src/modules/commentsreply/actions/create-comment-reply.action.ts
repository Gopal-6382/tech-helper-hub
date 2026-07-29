import { NextRequest, NextResponse } from "next/server";

import { JwtPayload } from "@/lib/auth";

import { CommentService } from "../services/comment-reply.service";
import { createCommentSchema } from "../validations/comment-reply.validation";

const commentService = new CommentService();

export async function createComment(
  req: NextRequest,
  user: JwtPayload,
) {
  const body = await req.json();

  const data = createCommentSchema.parse(body);

  const result =
    await commentService.createComment(
      user.userId,
      data,
    );

  return NextResponse.json(result, {
    status: 201,
  });
}