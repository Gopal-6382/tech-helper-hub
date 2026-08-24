import { USER_ROLES } from "@/constant/role.constant";
import { routeHandler } from "@/middleware/route.handler";

import { createComment } from "@/modules/comments/actions/create-comment.action";
import { getComments } from "@/modules/comments/actions/get-comments.action";
import { createCommentSchema } from "@/modules/comments/validations/comment.validation";

// POST /api/comments
export const POST = routeHandler(async (req, user) => {
  const body = await req.json();

  const data = createCommentSchema.parse(body);

  return createComment(user.userId, data);
},
{
  roles: USER_ROLES,
});
type getcommentsParams = {
  id: string;
};

// GET /api/comments?postId=xxxx
export const GET = routeHandler<getcommentsParams>(
  async (req, _user, { params }) => {
  const {id} = await params;

  if (!id) {
    throw new Error("postId is required");
  }

  return getComments(id);
},
{
  roles: USER_ROLES,
});