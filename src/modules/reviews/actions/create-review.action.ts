import { NextRequest, NextResponse } from "next/server";

import { ReviewService } from "../services/review.service";
import { createReviewSchema } from "../validations/review.validation";
import { JwtPayload } from "@/lib/auth";
const reviewService = new ReviewService();

export async function createReview(
  req: NextRequest,
  user: JwtPayload,
) {
  // Read request body.
  const body = await req.json();

  // Validate client input.
  const data = createReviewSchema.parse(body);

  // Business logic handled by Service.
  const review = await reviewService.createReview(
    user.userId,
    data,
  );

  return NextResponse.json(review, {
    status: 201,
  });
}