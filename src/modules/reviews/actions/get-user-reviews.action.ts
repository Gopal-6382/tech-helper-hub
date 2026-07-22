import { NextResponse } from "next/server";

import { ReviewService } from "../services/review.service";
import { JwtPayload } from "@/lib/auth";

const reviewService = new ReviewService();

export async function getUserReviews(
  user: JwtPayload,
) {
  // Current user's reviews.
  const reviews =
    await reviewService.getUserReviews(
      user.userId,
    );

  return NextResponse.json(reviews);
}