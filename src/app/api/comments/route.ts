import { NextRequest, NextResponse } from "next/server";

import { authMiddleware } from "@/middleware/auth.middleware";

import { createComment } from "@/modules/comments/actions/create-comment.action";
import { getComments } from "@/modules/comments/actions/get-comments.action";

// POST /api/comments
export const POST = authMiddleware(createComment);

// GET /api/comments?postId=xxxx
export async function GET(req: NextRequest) {
  try {
    const postId = req.nextUrl.searchParams.get("postId");

    if (!postId) {
      return NextResponse.json(
        {
          success: false,
          message: "postId is required",
        },
        { status: 400 },
      );
    }

    const comments = await getComments(postId);

    return NextResponse.json({
      success: true,
      data: comments,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 },
    );
  }
}
