import { routeHandler } from "@/middleware/route.handler";
import { likePost } from "@/modules/post-likes/actions/like-post.action";
import { USER_ROLES } from "@/constant/role.constant";

export const POST = routeHandler(
  async (req, user) => {
    const body = await req.json();

    return likePost(user.userId, body);
  },
  {
    roles: USER_ROLES,
  }
);