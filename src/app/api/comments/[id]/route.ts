import { routeHandler } from "@/middleware/route.handler";

import { getComment } from "@/modules/comments/actions/get-comment.action";
import { updateComment } from "@/modules/comments/actions/update-comment.action";
import { deleteComment } from "@/modules/comments/actions/delete-comment.action";

import { updateCommentSchema } from "@/modules/comments/validations/comment.validation";
import { USER_ROLES } from "@/constant/role.constant";

type CommentParams = {
  id: string;
};

// GET /api/comments/:id
export const GET = routeHandler<CommentParams>(
  async (_req, _user, { params }) => {
    const { id } = await params;

    return getComment(id);
  },
  {
    roles: USER_ROLES,
  }
);

// PATCH /api/comments/:id
export const PATCH = routeHandler<CommentParams>(
  async (req, user, { params }) => {
    const { id } = await params;

    const body = await req.json();

    const data = updateCommentSchema.parse(body);

    return updateComment(id, user.userId, data);
  }, {
    roles: USER_ROLES,
  }
);

// DELETE /api/comments/:id
export const DELETE = routeHandler<CommentParams>(
  async (_req, user, { params }) => {
    const { id } = await params;

    return deleteComment(id, user.userId);
  }, {
    roles: USER_ROLES,
  }
);