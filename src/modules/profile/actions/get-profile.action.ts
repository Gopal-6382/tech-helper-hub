import { NextRequest, NextResponse } from "next/server";
import { JwtPayload } from "@/lib/auth";
import { ProfileService } from "../services/profile.service";

const profileService = new ProfileService();

export async function getProfile(
  req: NextRequest,
  user: JwtPayload,
) {
  try {
    const result =
      await profileService.getProfile(user.userId);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      },
      {
        status: 404,
      }
    );
  }
}