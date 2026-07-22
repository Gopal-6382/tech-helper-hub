import { NextResponse } from "next/server";

import { ReviewService } from "../services/review.service";

const reviewService = new ReviewService();

export async function getProfessionalReviews(
  professionalId: string,
) {
  // Reviews received by professional.
  const reviews =
    await reviewService.getProfessionalReviews(
      professionalId,
    );

  return NextResponse.json(reviews);
}