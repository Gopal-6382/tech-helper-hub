import { NextRequest, NextResponse } from "next/server";

import { JwtPayload } from "@/lib/auth";

import { SavedPostService } from "../services/saved-post.service";
import { createSavedPostSchema } from "../validations/saved-post.validation";

const savedPostService = new SavedPostService();

export async function savePost(
  req: NextRequest,
  user: JwtPayload,
) {
  const body = await req.json();

  const data = createSavedPostSchema.parse(body);

  const result = await savedPostService.savePost(
    user.userId,
    data,
  );

  return NextResponse.json(result, {
    status: 201,
  });
}