import { NextResponse } from "next/server";

import { PostLikeService } from "../services/post-like.service";

const postLikeService = new PostLikeService();

export async function getPostLikes(
  postId: string,
) {
  const likes =
    await postLikeService.getPostLikes(
      postId,
    );

  return NextResponse.json(likes);
}