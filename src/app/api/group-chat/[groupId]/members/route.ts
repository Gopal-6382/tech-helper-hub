import { NextRequest } from "next/server";
import { authMiddleware } from "@/middleware/auth.middleware";
import { handleRequest } from "@/utils/api.helper";

import { getMembers } from "@/modules/groupchat/actions/get-members.action";
import { addMember } from "@/modules/groupchat/actions/add-member.action";

import { AddMemberDto } from "@/modules/groupchat/types/groupchat.types";

export const GET = authMiddleware(
  async (req: NextRequest, user, { params }) => {
    return handleRequest(async () => {
      const route = await params;

      if (!route || !("groupId" in route)) {
        throw new Error("groupId missing");
      }

      const { groupId } = route;
      return getMembers(groupId, user.userId);
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

      const body: AddMemberDto = await req.json();

      return addMember(groupId, user.userId, body.userId);
    });
  },
);
