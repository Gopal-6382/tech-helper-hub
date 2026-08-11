import { NextRequest } from "next/server";
import { authMiddleware } from "@/middleware/auth.middleware";
import { handleRequest } from "@/utils/api.helper";

import { updateMessage } from "@/modules/groupchat/actions/update-message.action";
import { deleteMessage } from "@/modules/groupchat/actions/delete-message.action";

import { SendGroupMessageDto } from "@/modules/groupchat/types/groupchat.types";

export const PATCH = authMiddleware(
  async (req: NextRequest, user, { params }) => {
    return handleRequest(async () => {
      const route = await params;

      if (!route || !("messageId" in route)) {
        throw new Error("messageId missing");
      }

      const { messageId } = route;

      const body: SendGroupMessageDto = await req.json();

      return updateMessage(messageId, user.userId, body.content);
    });
  },
);

export const DELETE = authMiddleware(
  async (req: NextRequest, user, { params }) => {
    return handleRequest(async () => {
      const route = await params;

      if (!route || !("messageId" in route)) {
        throw new Error("messageId missing");
      }

      const { messageId } = route;

      return deleteMessage(messageId, user.userId);
    });
  },
);
