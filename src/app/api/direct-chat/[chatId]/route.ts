import { routeHandler } from "@/middleware/route.handler";
import { getConversation } from "@/modules/directchat/actions/get-chat.action";
import { USER_ROLES } from "@/constant/role.constant";

type ChatParams = {
  chatId: string;
};

export const GET = routeHandler<ChatParams>(
  async (_req, _user, { params }) => {
    const { chatId } = await params;

    if (!chatId) {
      throw new Error("chatId is required");
    }

    return getConversation(chatId);
  },
  {
    roles: USER_ROLES,
  }
);