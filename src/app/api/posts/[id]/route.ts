import { NextRequest, NextResponse } from "next/server";

import { authMiddleware } from "@/middleware/auth.middleware";

import { getPost } from "@/modules/posts/actions/get-post.action";
import { updatePost } from "@/modules/posts/actions/update-post.action";
import { deletePost } from "@/modules/posts/actions/delete-post.action";

// GET
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    return getPost(id);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Post not found",
      },
      { status: 404 },
    );
  }
}

// PATCH
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const handler = authMiddleware((request, user) =>
    updatePost(request, user, id),
  );

  return handler(req);
}

// DELETE
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const handler = authMiddleware((_request, user) => deletePost(user, id));

  return handler(req);
}
