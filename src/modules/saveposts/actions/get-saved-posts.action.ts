import { NextRequest, NextResponse } from "next/server";

import { JwtPayload } from "@/lib/auth";

import { SavedPostService } from "@/modules/saveposts/services/saved-post.service";

const savedPostService = new SavedPostService();

export async function getSavedPosts(
  _req: NextRequest,
  user: JwtPayload,
  _context: {
    params?: Promise<Record<string, string>>;
  },
) {
  const result =
    await savedPostService.getSavedPosts(
      user.userId,
    );

  return NextResponse.json(result);
}