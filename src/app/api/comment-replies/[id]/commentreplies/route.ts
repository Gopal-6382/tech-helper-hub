import { routeHandler } from "@/middleware/route.handler";
import { getCommentReplies } from "@/modules/commentsreply/actions/get-comment-replies.action";
import { User } from "@/constant/roles.route.const";

type CommentReplyParams = {
  id: string;
};

export const GET = routeHandler<CommentReplyParams>(
  async (_req, _user, { params }) => {
    const { id } = await params;

    if (!id) {
      throw new Error("Reply id is required");
    }

    return getCommentReplies(id);
  },
  User,
);
