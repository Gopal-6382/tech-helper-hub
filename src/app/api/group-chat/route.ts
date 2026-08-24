import { routeHandler } from "@/middleware/route.handler";
import { CreateGroupDto } from "@/modules/groupchat/types/groupchat.types";
import { createGroup } from "@/modules/groupchat/actions/create-group.action";
import { USER_ROLES } from "@/constant/role.constant";

export const POST = routeHandler(async (req, user) => {
  const body: CreateGroupDto = await req.json();
  return createGroup(user.userId, body);
}
, {
  roles:USER_ROLES,
});
