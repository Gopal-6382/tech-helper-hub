import { NextResponse } from "next/server";

import { ReviewService } from "../services/review.service";
import { JwtPayload } from "@/lib/auth";

const reviewService = new ReviewService();

export async function deleteReview(
  user: JwtPayload,
  reviewId: string,
) {
  // Delete review.
  await reviewService.deleteReview(
    reviewId,
    user.userId,
  );

  return NextResponse.json({
    message: "Review deleted successfully",
  });
}