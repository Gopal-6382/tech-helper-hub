import { routeHandler } from "@/middleware/route.handler";

import { getCommentReply } from "@/modules/commentsreply/actions/get-comment-reply.action";
import { updateCommentReply } from "@/modules/commentsreply/actions/update-comment-reply.action";
import { deleteCommentReply } from "@/modules/commentsreply/actions/delete-comment-reply.action";
import { updateCommentReplySchema } from "@/modules/commentsreply/validations/comment-reply.validation";
import { UpdateCommentReplyData } from "@/modules/commentsreply/types/comment-reply.types";
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

    return getCommentReply(id);
  },
  User,
);

export const PATCH = routeHandler<CommentReplyParams>(
  async (req, user, { params }) => {
    const { id } = await params;
    const body = await req.json();
    const data: UpdateCommentReplyData = updateCommentReplySchema.parse(body);

    if (!id) {
      throw new Error("Reply id is required");
    }

    return updateCommentReply(id, user.userId, data);
  },
  User,
);

export const DELETE = routeHandler<CommentReplyParams>(
  async (_req, user, { params }) => {
    const { id } = await params;

    if (!id) {
      throw new Error("Reply id is required");
    }

    return deleteCommentReply(id, user.userId);
  },
  User,
);
