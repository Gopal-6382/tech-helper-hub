import { NextRequest } from "next/server";

import { JwtPayload } from "@/lib/auth";
import { authMiddleware } from "@/middleware/auth.middleware";
import { getMessages } from "@/modules/directchat/actions/get-messages.action";
import { sendMessage } from "@/modules/directchat/actions/send-message.action";
import { SendMessageDto } from "@/modules/directchat/types/direct-chat.types";
import { handleRequest } from "@/utils/api.helper";

export const GET = authMiddleware(
  async (req: NextRequest, user: JwtPayload, { params }) => {
    return handleRequest(async () => {
      const route = await params;
      if (!route || !("chatId" in route)) {
        throw new Error("chatId missing");
      }

      const { chatId } = route;

      return getMessages(chatId);
    });
  },
);

export const POST = authMiddleware(
  async (req: NextRequest, user: JwtPayload, { params }) => {
    return handleRequest(async () => {
      const route = await params;
      if (!route || !("chatId" in route)) {
        throw new Error("chatId missing");
      }

      const { chatId } = route;

      const body: SendMessageDto = await req.json();

      return sendMessage(user.userId, chatId, {
        content: body.content,
      });
    });
  },
);
