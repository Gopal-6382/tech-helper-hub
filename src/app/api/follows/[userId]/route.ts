import { routeHandler } from "@/middleware/route.handler";
import { unfollowUser } from "@/modules/follows/actions/unfollow-user.action";
import { USER_ROLES } from "@/constant/role.constant";

type UnfollowParams = {
  userId: string;
};

export const DELETE = routeHandler<UnfollowParams>(
  async (_req, user, { params }) => {
    const { userId: followingId } = await params;

    if (!followingId) {
      throw new Error("userId is required");
    }

    return unfollowUser(user.userId, followingId);
  },
  {
    roles: USER_ROLES,
  },
);
