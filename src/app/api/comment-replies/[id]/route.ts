import { NextRequest, NextResponse } from "next/server";

import { authMiddleware } from "@/middleware/auth.middleware";

import { getCommentReply } from "@/modules/commentsreply/actions/get-comment-reply.action";
import { updateCommentReply } from "@/modules/commentsreply/actions/update-comment-reply.action";
import { deleteCommentReply } from "@/modules/commentsreply/actions/delete-comment-reply.action";

// GET
export async function GET(
  _req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    const { id } = await params;

    return getCommentReply(id);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Reply not found",
      },
      {
        status: 404,
      },
    );
  }
}

// PATCH
export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  const handler = authMiddleware(async (request, user, context) => {
    const { id } = await context.params!;

    return updateCommentReply(request, user, id);
  });

  return handler(req, { params });
}

// DELETE
export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  const handler = authMiddleware(async (_request, user, context) => {
    const { id } = await context.params!;

    return deleteCommentReply(id, user.userId);
  });

  return handler(req, { params });
}
