import { routeHandler } from "@/middleware/route.handler";

import { joinGroup } from "@/modules/groupchat/actions/join-group.action";

import { USER_ROLES } from "@/constant/role.constant";

type JoinGroupParams = {
  groupId: string;
};

export const POST = routeHandler<JoinGroupParams>(
  async (_req, user, { params }) => {
    const { groupId } = await params;

    if (!groupId) {
      throw new Error("groupId is required");
    }

    return joinGroup(groupId, user.userId);
  },
  {
    roles: USER_ROLES,
  },
);
