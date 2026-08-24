import { routeHandler } from "@/middleware/route.handler";
import { makeAdmin } from "@/modules/groupchat/actions/make-admin.action";
import { removeMember } from "@/modules/groupchat/actions/remove-member.action";
import { USER_ROLES } from "@/constant/role.constant";

type GroupAdminParams = {
  groupId: string;
  userId: string;
};

export const PATCH = routeHandler<GroupAdminParams>(
  async (_req, user, { params }) => {
    const { groupId, userId } = await params;

    if (!groupId || !userId) {
      throw new Error("groupId and userId are required");
    }

    return makeAdmin(groupId, user.userId, userId);
  },
  {
    roles: USER_ROLES,
  },
);

export const DELETE = routeHandler<GroupAdminParams>(
  async (_req, user, { params }) => {
    const { groupId, userId } = await params;

    if (!groupId || !userId) {
      throw new Error("groupId and userId are required");
    }

    return removeMember(groupId, user.userId, userId);
  },
  {
    roles: USER_ROLES,
  },
);
