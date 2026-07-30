import { NextRequest, NextResponse } from "next/server";
import { JwtPayload } from "@/lib/auth";

import { PostService } from "../services/saved-post.service";
import { updatePostSchema } from "../validations/saved-post.validation";

const postService = new PostService();

export async function updatePost(
  req: NextRequest,
  user: JwtPayload,
  id: string,
) {
  const body = await req.json();

  const data = updatePostSchema.parse(body);

  const result = await postService.updatePost(id, user.userId, data);

  return NextResponse.json(result);
}
