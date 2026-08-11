import { NextRequest } from "next/server";
import { authMiddleware } from "@/middleware/auth.middleware";
import { handleRequest } from "@/utils/api.helper";

import { getGroup } from "@/modules/groupchat/actions/get-group.action";
import { updateGroup } from "@/modules/groupchat/actions/update-group.action";
import { deleteGroup } from "@/modules/groupchat/actions/delete-group.action";

import { updateGroupData } from "@/modules/groupchat/types/groupchat.types";
export const GET = authMiddleware(
  async (req: NextRequest, user, { params }) => {
    return handleRequest(async () => {
       const route = await params;

      if (!route || !("groupId" in route)) {
        throw new Error("groupId missing");
      }

      const { groupId} = route;


      return getGroup(groupId, user.userId);
    });
  },
);

export const PATCH = authMiddleware(
  async (req: NextRequest, user, { params }) => {
    return handleRequest(async () => {
      const route = await params;

      if (!route || !("groupId" in route)) {
        throw new Error("groupId missing");
      }

      const { groupId } = route;

      const body: updateGroupData = await req.json();

      return updateGroup(
        groupId,
        user.userId,
        body,
      );
    });
  },
);

export const DELETE = authMiddleware(
  async (req: NextRequest, user, { params }) => {
    return handleRequest(async () => {
      const route = await params;

      if (!route || !("groupId" in route)) {
        throw new Error("groupId missing");
      }

      const { groupId } = route;


      return deleteGroup(groupId, user.userId);
    });
  },
);
