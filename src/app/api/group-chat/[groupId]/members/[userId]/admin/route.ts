import { routeHandler } from "@/middleware/route.handler";
import { removeAdmin } from "@/modules/groupchat/actions/remove-admin.action";
import { USER_ROLES } from "@/constant/role.constant";

type GroupAdminParams = {
  groupId: string;
  userId: string;
};

export const DELETE = routeHandler<GroupAdminParams>(
  async (_req, user, { params }) => {
    const { groupId, userId } = await params;

    if (!groupId || !userId) {
      throw new Error("groupId and userId are required");
    }

    return removeAdmin(groupId, user.userId, userId);
  },
  {
    roles: USER_ROLES,
  },
);
