import { routeHandler } from "@/middleware/route.handler";
import { getMembers } from "@/modules/groupchat/actions/get-members.action";
import { addMember } from "@/modules/groupchat/actions/add-member.action";
import { AddMemberDto } from "@/modules/groupchat/types/groupchat.types";
import { USER_ROLES } from "@/constant/role.constant";

type GroupMemberParams = {
  groupId: string;
};

export const GET = routeHandler<GroupMemberParams>(
  async (_req, user, { params }) => {
    const { groupId } = await params;

    if (!groupId) {
      throw new Error("groupId is required");
    }

    return getMembers(groupId, user.userId);
  },
  {
    roles: USER_ROLES,
  },
);

export const POST = routeHandler<GroupMemberParams>(
  async (req, user, { params }) => {
    const { groupId } = await params;

    if (!groupId) {
      throw new Error("groupId is required");
    }

    const body: AddMemberDto = await req.json();

    return addMember(groupId, user.userId, body.userId);
  },
  {
    roles: USER_ROLES,
  },
);
