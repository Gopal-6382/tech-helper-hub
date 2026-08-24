import { routeHandler } from "@/middleware/route.handler";
import { USER_ROLES } from "@/constant/role.constant";
import { getComments } from "@/modules/comments/actions/get-comments.action";

type CommentParams = {
  id: string;
};

// GET /api/comments?postId=xxxx
export const GET = routeHandler<CommentParams>(
  async (req, _user, { params }) => {
    const { id } = await params;

    if (!id) {
      throw new Error("postId is required");
    }

    return getComments(id);
  },
  {
    roles: USER_ROLES,
  },
);
