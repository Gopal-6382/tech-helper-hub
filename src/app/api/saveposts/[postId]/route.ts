import { NextRequest } from "next/server";

import { authMiddleware } from "@/middleware/auth.middleware";

import { unsavePost } from "@/modules/saveposts/actions/unsave-post.action";

export const DELETE = authMiddleware(async (_req, user, context) => {
  const { postId } = await context.params!;

  return unsavePost(user, postId);
});
