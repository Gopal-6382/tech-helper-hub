import { NextResponse } from "next/server";

import { postViewService } from "../services/post-view.service";
import {
  createPostViewDtoSchema,
  type CreatePostViewDto,
} from "../types/post-view.types";

export async function recordPostView(
  payload: CreatePostViewDto
) {
  const validatedPayload =
    createPostViewDtoSchema.safeParse(payload);

  if (!validatedPayload.success) {
    return NextResponse.json(
      {
        success: false,
        message:
          validatedPayload.error.issues[0]?.message ??
          "Invalid post view request.",
      },
      { status: 400 }
    );
  }

  const result = await postViewService.recordPostView(
    validatedPayload.data
  );

  if (!result.success) {
    return NextResponse.json(result, {
      status: 404,
    });
  }

  return NextResponse.json(result);
}