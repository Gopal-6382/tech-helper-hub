import { NextResponse } from "next/server";

import { authMiddleware } from "@/middleware/auth.middleware";

import { getPost } from "@/modules/posts/actions/get-post.action";
import { updatePost } from "@/modules/posts/actions/update-post.action";
import { deletePost } from "@/modules/posts/actions/delete-post.action";

// --------------------------------------------------
// GET /api/posts/:id
// --------------------------------------------------
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const post = await getPost(id);

    return NextResponse.json({
      success: true,
      data: post,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Post not found",
      },
      {
        status: 404,
      },
    );
  }
}

// --------------------------------------------------
// PATCH /api/posts/:id
// Login Required
// --------------------------------------------------
export const PATCH = authMiddleware(
  async (
    req,
    user,
    // if your authMiddleware doesn't support params,
    // move this logic into the route wrapper.
  ) => {
    throw new Error(
      "Use the version compatible with your auth middleware.",
    );
  },
);