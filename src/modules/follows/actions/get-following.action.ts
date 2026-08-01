import { NextRequest, NextResponse } from "next/server";

import { JwtPayload } from "@/lib/auth";

import { FollowService } from "../services/follow.service";

const followService = new FollowService();

export async function getFollowing(
  _req: NextRequest,
  user: JwtPayload,
) {
  const result =
    await followService.getFollowing(
      user.userId,
    );

  return NextResponse.json(result);
}