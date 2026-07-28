import { NextRequest, NextResponse } from "next/server";

import { authMiddleware } from "@/middleware/auth.middleware";

import { unlikePost } from "@/modules/post-likes/actions/unlike-post.action";
import { getPostLikes } from "@/modules/post-likes/actions/get-post-likes.action";

// GET /api/post-likes/:postId
export async function GET(
  _req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ postId: string }>;
  }
) {
  try {
    const { postId } = await params;

    return getPostLikes(postId);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to fetch likes",
      },
      { status: 500 }
    );
  }
}

// DELETE /api/post-likes/:postId
export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  const handler = authMiddleware(
    async (_req, user, context) => {
      const { id } = (await context.params)! ;

      return unlikePost(id, user.userId);
    },
  );

  return handler(req, {
    params,
  });
}