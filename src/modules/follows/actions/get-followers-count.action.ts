import { NextRequest, NextResponse } from "next/server";

import { JwtPayload } from "@/lib/auth";

import { FollowService } from "../services/follow.service";

const followService = new FollowService();

export async function getFollowersCount(
  _req: NextRequest,
  user: JwtPayload,
) {
  const result =
    await followService.getFollowersCount(
      user.userId,
    );

  return NextResponse.json(result);
}