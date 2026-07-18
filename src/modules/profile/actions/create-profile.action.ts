import { NextRequest, NextResponse } from "next/server";
import { JwtPayload } from "@/lib/auth";
import { ProfileService } from "../services/profile.service";

const profileService = new ProfileService();

export async function createProfile(req: NextRequest, user: JwtPayload) {
  try {
    const body = await req.json();

    const result = await profileService.createProfile(user.userId, body);

    return NextResponse.json(result, {
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      {
        status: 400,
      },
    );
  }
}
