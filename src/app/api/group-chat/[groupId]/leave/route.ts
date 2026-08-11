import { NextRequest } from "next/server";
import { authMiddleware } from "@/middleware/auth.middleware";
import { handleRequest } from "@/utils/api.helper";
import { leaveGroup } from "@/modules/groupchat/actions/leave-group.action";

export const POST = authMiddleware(
  async (req: NextRequest, user, { params }) => {
    return handleRequest(async () => {
      const { groupId } = (await params) ?? {};

      return leaveGroup(groupId, user.userId);
    });
  },
);
