import { routeHandler } from "@/middleware/route.handler";

import { createCommentReply } from "@/modules/commentsreply/actions/create-comment-reply.action";
import { getCommentReplies } from "@/modules/commentsreply/actions/get-comment-replies.action";
import { CreateCommentReplyData } from "@/modules/commentsreply/types/comment-reply.types";
import { createCommentReplyDataSchema } from "@/modules/commentsreply/validations/comment-reply.validation";

// POST /api/comment-replies
export const POST = routeHandler(async (req, user) => {
  const body: CreateCommentReplyData = await req.json();
  const data = createCommentReplyDataSchema.parse(body);

  return createCommentReply(user.userId, data);
});

// GET /api/comment-replies?commentId=xxxx
export const GET = routeHandler(async (req) => {
  const commentId = req.nextUrl.searchParams.get("commentId");

  if (!commentId) {
    throw new Error("commentId is required");
  }

  return getCommentReplies(commentId);
});
