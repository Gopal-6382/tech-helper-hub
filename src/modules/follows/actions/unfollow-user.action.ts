import { NextResponse } from "next/server";

import { JwtPayload } from "@/lib/auth";

import { FollowService } from "../services/follow.service";

const followService = new FollowService();

export async function unfollowUser(
  user: JwtPayload,
  followingId: string,
) {
  const result =
    await followService.unfollowUser(
      user.userId,
      followingId,
    );

  return NextResponse.json(result);
}