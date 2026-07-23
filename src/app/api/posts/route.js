import { NextResponse } from "next/server";

import { authMiddleware } from "@/middleware/auth.middleware";

import { createPost } from "@/modules/posts/actions/create-post.action";
import { getPosts } from "@/modules/posts/actions/get-posts.action";

// --------------------------------------------------
// GET /api/posts
// Public feed
// --------------------------------------------------
export async function GET() {
  try {
    const posts = await getPosts();

    return NextResponse.json({
      success: true,
      data: posts,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch posts",
      },
      {
        status: 500,
      },
    );
  }
}

// --------------------------------------------------
// POST /api/posts
// Login Required
// --------------------------------------------------
export const POST = authMiddleware(
  async (req, user) => {
    try {
      const post = await createPost(
        req,
        user.userId,
      );

      return NextResponse.json(
        {
          success: true,
          message: "Post created successfully",
          data: post,
        },
        {
          status: 201,
        },
      );
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "Failed to create post",
        },
        {
          status: 500,
        },
      );
    }
  },
);