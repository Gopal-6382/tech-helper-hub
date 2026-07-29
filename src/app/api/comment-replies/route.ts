import { NextRequest, NextResponse } from "next/server";

import { authMiddleware } from "@/middleware/auth.middleware";

import { createCommentReply } from "@/modules/commentsreply/actions/create-comment-reply.action";
import { getCommentReplies } from "@/modules/commentsreply/actions/get-comment-replies.action";

// POST /api/comment-replies
export const POST = authMiddleware(createCommentReply);

// GET /api/comment-replies?commentId=xxxx
export async function GET(req: NextRequest) {
  try {
    const commentId = req.nextUrl.searchParams.get("commentId");

    if (!commentId) {
      return NextResponse.json(
        {
          success: false,
          message: "commentId is required",
        },
        {
          status: 400,
        },
      );
    }

    return getCommentReplies(commentId);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}
