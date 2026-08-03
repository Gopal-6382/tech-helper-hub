import { NextRequest } from "next/server";
import { createConversation } from "@/modules/directchat/actions/create-chat.action";
import { authMiddleware } from "@/middleware/auth.middleware";
import { handleRequest } from "@/utils/api.helper";
import { JwtPayload } from "@/lib/auth";
import { CreateConversationDto } from "@/modules/directchat/types/direct-chat.types";
export const POST = authMiddleware(
  async (req: NextRequest, user: JwtPayload) => {
    return handleRequest(async () => {
      const body: CreateConversationDto = await req.json();

      return createConversation(user.userId, body);
    });
  },
);
