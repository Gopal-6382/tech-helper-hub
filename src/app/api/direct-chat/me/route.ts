import { routeHandler } from "@/middleware/route.handler";
import { getUserConversations } from "@/modules/directchat/actions/get-my-chats.action";
import { USER_ROLES } from "@/constant/role.constant";

export const GET = routeHandler(
  async (_req, user) => {
    return getUserConversations(user.userId);
  },
  {
    roles: USER_ROLES,
  }
);