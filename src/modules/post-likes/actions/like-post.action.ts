import { NextRequest, NextResponse } from "next/server";

import { JwtPayload } from "@/lib/auth";

import { PostLikeService } from "../services/post-like.service";
import { createPostLikeSchema } from "../validations/post-like.validation";

const postLikeService = new PostLikeService();

export async function likePost(
  req: NextRequest,
  user: JwtPayload,
) {
  const body = await req.json();

  const { postId } =
    createPostLikeSchema.parse(body);

  const result =
    await postLikeService.likePost(
      postId,
      user.userId,
    );

  return NextResponse.json(result);
}