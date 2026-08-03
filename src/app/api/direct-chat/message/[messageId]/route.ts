import { NextRequest } from "next/server";

import { JwtPayload } from "@/lib/auth";
import { authMiddleware } from "@/middleware/auth.middleware";
import { deleteMessage } from "@/modules/directchat/actions/delete-message.action";
import { markMessageRead } from "@/modules/directchat/actions/mark-as-read.action";
import { handleRequest } from "@/utils/api.helper";

export const PATCH = authMiddleware(
  async (req: NextRequest, user: JwtPayload, { params }) => {
    return handleRequest(async () => {
      const route = await params;
      if (!route || !("messageId" in route)) {
        throw new Error("messageId missing");
      }

      const { messageId } = route;

      return markMessageRead(messageId);
    });
  },
);

export const DELETE = authMiddleware(
  async (req: NextRequest, user: JwtPayload, { params }) => {
    return handleRequest(async () => {
      const route = await params;
      if (!route || !("messageId" in route)) {
        throw new Error("messageId missing");
      }

      const { messageId } = route;
      return deleteMessage(messageId);
    });
  },
);
