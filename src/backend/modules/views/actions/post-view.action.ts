import {
  createPostViewDtoSchema,
  type CreatePostViewDto,
} from "../types/post-view.types";

import { postViewService } from "../services/post-view.service";

export async function recordPostView(
  payload: CreatePostViewDto,
) {
  const validatedPayload =
    createPostViewDtoSchema.safeParse(payload);

  if (!validatedPayload.success) {
    return {
      success: false as const,
      status: 400,
      message:
        validatedPayload.error.issues[0]?.message ??
        "Invalid post view request.",
    };
  }

  return postViewService.recordPostView(
    validatedPayload.data,
  );
}