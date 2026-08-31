import { routeHandler } from "@/middleware/route.handler";
import { getUserConversations } from "@/modules/directchat/actions/get-my-chats.action";
import { User } from "@/constant/roles.route.const";

export const GET = routeHandler(async (_req, user) => {
  return getUserConversations(user.userId);
}, User);
