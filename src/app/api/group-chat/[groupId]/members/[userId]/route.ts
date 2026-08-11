import { NextRequest } from "next/server";
import { authMiddleware } from "@/middleware/auth.middleware";
import { handleRequest } from "@/utils/api.helper";

import { makeAdmin } from "@/modules/groupchat/actions/make-admin.action";
import { removeAdmin } from "@/modules/groupchat/actions/remove-admin.action";
import { removeMember } from "@/modules/groupchat/actions/remove-member.action";

export const PATCH = authMiddleware(
  async (req: NextRequest, user, { params }) => {
    return handleRequest(async () => {
      const route = await params;

      if (!route || !("groupId" in route) || !("userId" in route)) {
        throw new Error("groupId or userId missing");
      }

      const { groupId, userId } = route;

      return makeAdmin(groupId, user.userId, userId);
    });
  },
);

export const DELETE = authMiddleware(
  async (req: NextRequest, user, { params }) => {
    return handleRequest(async () => {
      const route = await params;

      if (!route || !("groupId" in route) || !("userId" in route)) {
        throw new Error("groupId or userId missing");
      }

      const { groupId, userId } = route;

      return removeMember(groupId, user.userId, userId);
    });
  },
);
