import { NextRequest } from "next/server";
import { authMiddleware } from "@/middleware/auth.middleware";
import { handleRequest } from "@/utils/api.helper";

import { removeAdmin } from "@/modules/groupchat/actions/remove-admin.action";
export const DELETE = authMiddleware(
  async (req: NextRequest, user, { params }) => {
    return handleRequest(async () => {
      const route = await params;

      if (!route || !("groupId" in route) || !("userId" in route)) {
        throw new Error("groupId or userId missing");
      }

      const { groupId, userId } = route;

      return removeAdmin(groupId, user.userId, userId);
    });
  },
);
