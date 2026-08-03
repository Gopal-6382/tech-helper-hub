import { NextRequest } from "next/server";

import { JwtPayload } from "@/lib/auth";
import { authMiddleware } from "@/middleware/auth.middleware";
import { getParticipants } from "@/modules/directchat/actions/get-getParticipants";
import { handleRequest } from "@/utils/api.helper";

export const GET = authMiddleware(
  async (req: NextRequest, user: JwtPayload, { params }) => {
    return handleRequest(async () => {
      const route = await params;
      if (!route || !("chatId" in route)) {
        throw new Error("chatId missing");
      }

      const { chatId } = route;

      return getParticipants(chatId);
    });
  },
);
