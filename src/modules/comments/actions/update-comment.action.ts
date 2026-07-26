import { NextRequest, NextResponse } from "next/server";

import { JwtPayload } from "@/lib/auth";

import { CommentService } from "../services/comment.service";
import { updateCommentSchema } from "../validations/comment.validation";

const commentService = new CommentService();

export async function updateComment(
  req: NextRequest,
  user: JwtPayload,
  id: string,
) {
  const body = await req.json();

  const data = updateCommentSchema.parse(body);

  const result =
    await commentService.updateComment(
      id,
      user.userId,
      data,
    );

  return NextResponse.json(result);
}