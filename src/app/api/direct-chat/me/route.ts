import { NextRequest } from "next/server";

import { JwtPayload } from "@/lib/auth";
import { authMiddleware } from "@/middleware/auth.middleware";
import { getUserConversations } from "@/modules/directchat/actions/get-my-chats.action";
import { handleRequest } from "@/utils/api.helper";

export const GET = authMiddleware(
  async (req: NextRequest, user: JwtPayload) => {
    return handleRequest(async () => {
      return getUserConversations(user.userId);
    });
  },
);
