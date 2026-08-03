import { NextRequest, NextResponse } from "next/server";

import { JwtPayload } from "@/lib/auth";

import { FollowService } from "../services/follow.service";
import { createFollowSchema } from "../validations/follow.validation";

const followService = new FollowService();

export async function followUser(req: NextRequest, user: JwtPayload) {
  const body = await req.json();

  const data = createFollowSchema.parse(body);

  const result = await followService.followUser(user.userId, data);

  return NextResponse.json(result, {
    status: 201,
  });
}
