import { NextRequest, NextResponse } from "next/server";

import { authMiddleware } from "@/middleware/auth.middleware";

import { getComment } from "@/modules/comments/actions/get-comment.action";
import { updateComment } from "@/modules/comments/actions/update-comment.action";
import { deleteComment } from "@/modules/comments/actions/delete-comment.action";

// GET
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const comment = await getComment(id);

    return NextResponse.json({
      success: true,
      data: comment,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Comment not found",
      },
      { status: 404 },
    );
  }
}

// PATCH
export const PATCH = authMiddleware(async (req, user, context) => {
  const { id } = await context.params;

  return updateComment(req, user, id);
});

// DELETE
export const DELETE = authMiddleware(async (_req, user, context) => {
  const { id } = await context.params;

  return deleteComment(id, user.userId);
});
