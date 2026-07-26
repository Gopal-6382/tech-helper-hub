import { NextResponse } from "next/server";

import { JwtPayload } from "@/lib/auth";

import { CommentService } from "../services/comment.service";

const commentService = new CommentService();

export async function deleteComment(
  user: JwtPayload,
  id: string,
) {
  const result =
    await commentService.deleteComment(
      id,
      user.userId,
    );

  return NextResponse.json(result);
}