import { NextResponse } from "next/server";

import { ReviewService } from "../services/review.service";

const reviewService = new ReviewService();

export async function getReview(id: string) {
  // Fetch one review.
  const review =
    await reviewService.getReview(id);

  return NextResponse.json(review);
}