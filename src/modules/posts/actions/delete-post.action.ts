import { NextResponse } from "next/server";
import { JwtPayload } from "@/lib/auth";

import { PostService } from "../services/post.service";

const postService = new PostService();

export async function deletePost(
  user: JwtPayload,
  id: string,
) {
  await postService.deletePost(id, user.userId);

  return NextResponse.json({
    success: true,
    message: "Post deleted successfully",
  });
}