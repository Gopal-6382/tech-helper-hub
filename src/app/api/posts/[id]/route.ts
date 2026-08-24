import { routeHandler } from "@/middleware/route.handler";
import { getPost } from "@/modules/posts/actions/get-post.action";
import { updatePost } from "@/modules/posts/actions/update-post.action";
import { deletePost } from "@/modules/posts/actions/delete-post.action";
import { USER_ROLES } from "@/constant/role.constant";
import { updatePostSchema } from "@/modules/posts/validations/post.validation";
import { UpdatePostDto } from "@/modules/posts/types/post.types";

type PostRouteParams = {
  id: string;
};

// GET /api/posts/[id]
export const GET = routeHandler<PostRouteParams>(
  async (_req, _user, { params }) => {
    const { id } = await params;

    if (!id) {
      throw new Error("Post ID is required");
    }

    return getPost(id);
  },
);

// PATCH /api/posts/[id]
export const PATCH = routeHandler<PostRouteParams>(
  async (req, user, { params }) => {
    const { id } = await params;

    if (!id) {
      throw new Error("Post ID is required");
    }

    const body: UpdatePostDto = await req.json();
    const data = updatePostSchema.parse(body);

    return updatePost(id, user.userId, data);
  },
  {
    roles: USER_ROLES,
  },
);

// DELETE /api/posts/[id]
export const DELETE = routeHandler<PostRouteParams>(
  async (_req, user, { params }) => {
    const { id } = await params;

    if (!id) {
      throw new Error("Post ID is required");
    }

    return deletePost(id, user.userId);
  },
  {
    roles: USER_ROLES,
  },
);
