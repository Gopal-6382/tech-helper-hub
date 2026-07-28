import { NextResponse } from "next/server";

import { PostLikeService } from "../services/post-like.service";

const postLikeService = new PostLikeService();
export async function unlikePost(
  postId: string,
  userId: string,
) {
  console.log("postId:", postId);
  console.log("userId:", userId);

  const result = await postLikeService.unlikePost(
    postId,
    userId,
  );

  return NextResponse.json(result);
}