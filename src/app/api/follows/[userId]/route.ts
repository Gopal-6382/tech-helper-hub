import { authMiddleware } from "@/middleware/auth.middleware";

import { unfollowUser } from "@/modules/follows/actions/unfollow-user.action";

export const DELETE = authMiddleware(async (_req, user, context) => {
  const { userId } = await context.params!;

  return unfollowUser(user, userId);
});
