import { getGroup } from "@/modules/groupchat/actions/get-group.action";
import { updateGroup } from "@/modules/groupchat/actions/update-group.action";
import { deleteGroup } from "@/modules/groupchat/actions/delete-group.action";
import { updateGroupData } from "@/modules/groupchat/types/groupchat.types";
import { routeHandler } from "@/middleware/route.handler";
import { updateGroupSchema } from "@/modules/groupchat/validations/groupchat.validations";

type GroupParams = {
  groupId: string;
};

export const GET = routeHandler<GroupParams>(async (req, user, { params }) => {
  const { groupId } = await params;

  return getGroup(groupId, user.userId);
});

export const PATCH = routeHandler<GroupParams>(
  async (req, user, { params }) => {
    const { groupId } = await params;

    const body: updateGroupData = await req.json();
    const data = updateGroupSchema.parse(body);
    return updateGroup(groupId, user.userId, data);
  },
);

export const DELETE = routeHandler<GroupParams>(
  async (req, user, { params }) => {
    const { groupId } = await params;

    return deleteGroup(groupId, user.userId);
  },
);
