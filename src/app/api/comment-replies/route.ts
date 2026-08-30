import { routeHandler } from "@/middleware/route.handler";

import { createCommentReply } from "@/modules/commentsreply/actions/create-comment-reply.action";
import { CreateCommentReplyData } from "@/modules/commentsreply/types/comment-reply.types";
import { createCommentReplyDataSchema } from "@/modules/commentsreply/validations/comment-reply.validation";
import { User } from "@/constant/roles.route.const";

// POST /api/comment-replies
export const POST = routeHandler(async (req, user) => {
  const body = await req.json();
  const data = createCommentReplyDataSchema.parse({
    ...body,
    authorId: user.userId,
  }) as CreateCommentReplyData;

  return createCommentReply(user.userId, data);
}, User);
