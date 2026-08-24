import { USER_ROLES } from "@/constant/role.constant";
import { routeHandler } from "@/middleware/route.handler";

import { createComment } from "@/modules/comments/actions/create-comment.action";
import { createCommentSchema } from "@/modules/comments/validations/comment.validation";

// POST /api/comments
export const POST = routeHandler(
  async (req, user) => {
    const body = await req.json();

    const data = createCommentSchema.parse(body);

    return createComment(user.userId, data);
  },
  {
    roles: USER_ROLES,
  },
);
