import { routeHandler } from "@/middleware/route.handler";

import { USER_ROLES } from "@/constant/role.constant";

import { getPost } from "@/modules/posts/actions/get-post.action";
import { updatePost } from "@/modules/posts/actions/update-post.action";
import { deletePost } from "@/modules/posts/actions/delete-post.action";

import { updatePostSchema } from "@/modules/posts/validations/post.validation";

type PostRouteParams = {
  id: string;
};

export const GET = routeHandler<PostRouteParams>(
  async (_req, _user, { params }) => {
    const { id } = await params;

    return getPost(id);
  },
);

export const PATCH = routeHandler<PostRouteParams>(
  async (req, user, { params }) => {
    const { id } = await params;

    const body = await req.json();

    const data = updatePostSchema.parse(body);

    return updatePost(id, user.userId, data);
  },
  {
    roles: USER_ROLES,
  },
);

export const DELETE = routeHandler<PostRouteParams>(
  async (_req, user, { params }) => {
    const { id } = await params;

    return deletePost(id, user.userId);
  },
  {
    roles: USER_ROLES,
  },
);
