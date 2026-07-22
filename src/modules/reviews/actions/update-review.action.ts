import { NextRequest, NextResponse } from "next/server";

import { ReviewService } from "../services/review.service";
import { updateReviewSchema } from "../validations/review.validation";
import { JwtPayload } from "@/lib/auth";

const reviewService = new ReviewService();

export async function updateReview(
  req: NextRequest,
  user: JwtPayload,
  reviewId: string,
) {
  // Read request body.
  const body = await req.json();

  // Validate request.
  const data = updateReviewSchema.parse(body);

  // Update review.
  const review =
    await reviewService.updateReview(
      reviewId,
      user.userId,
      data,
    );

  return NextResponse.json(review);
}