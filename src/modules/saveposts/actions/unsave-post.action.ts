import { NextResponse } from "next/server";

import { JwtPayload } from "@/lib/auth";

import { SavedPostService } from "../services/saved-post.service";

const savedPostService = new SavedPostService();

export async function unsavePost(
  user: JwtPayload,
  postId: string,
) {
  const result = await savedPostService.unsavePost(
    user.userId,
    postId,
  );

  return NextResponse.json(result);
}