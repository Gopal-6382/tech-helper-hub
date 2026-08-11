import { NextRequest } from "next/server";
import { authMiddleware } from "@/middleware/auth.middleware";
import { handleRequest } from "@/utils/api.helper";

import { getMessages } from "@/modules/groupchat/actions/get-messages.action";
import { sendMessage } from "@/modules/groupchat/actions/send-message.action";

import { SendGroupMessageDto } from "@/modules/groupchat/types/groupchat.types";

export const GET = authMiddleware(
  async (req: NextRequest, user, { params }) => {
    return handleRequest(async () => {
      const route = await params;

      if (!route || !("groupId" in route)) {
        throw new Error("groupId missing");
      }

      const { groupId } = route;

      return getMessages(groupId, user.userId);
    });
  },
);

export const POST = authMiddleware(
  async (req: NextRequest, user, { params }) => {
    return handleRequest(async () => {
      const route = await params;

      if (!route || !("groupId" in route)) {
        throw new Error("groupId missing");
      }

      const { groupId } = route;
      const body: SendGroupMessageDto = await req.json();

      return sendMessage(user.userId, {
        groupId,
        content: body.content,
      });
    });
  },
);
