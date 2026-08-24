import { routeHandler } from "@/middleware/route.handler";
import { leaveGroup } from "@/modules/groupchat/actions/leave-group.action";
import { USER_ROLES } from "@/constant/role.constant";

type LeaveGroupParams = {
  groupId: string;
};

export const POST = routeHandler<LeaveGroupParams>(
  async (_req, user, { params }) => {
    const { groupId } = await params;

    if (!groupId) {
      throw new Error("groupId is required");
    }

    return leaveGroup(groupId, user.userId);
  },
  {
    roles: USER_ROLES,
  },
);
