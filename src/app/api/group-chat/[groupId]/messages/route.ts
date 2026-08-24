import { routeHandler } from "@/middleware/route.handler";
import { getMessages } from "@/modules/groupchat/actions/get-messages.action";
import { sendMessage } from "@/modules/groupchat/actions/send-message.action";
import { SendGroupMessageDto } from "@/modules/groupchat/types/groupchat.types";
import { USER_ROLES } from "@/constant/role.constant";

type GroupMessageParams = {
  groupId: string;
};

export const GET = routeHandler<GroupMessageParams>(
  async (_req, user, { params }) => {
    const { groupId } = await params;

    if (!groupId) {
      throw new Error("groupId is required");
    }

    return getMessages(groupId, user.userId);
  },
  {
    roles: USER_ROLES,
  }
);

export const POST = routeHandler<GroupMessageParams>(
  async (req, user, { params }) => {
    const { groupId } = await params;

    if (!groupId) {
      throw new Error("groupId is required");
    }

    const body: SendGroupMessageDto = await req.json();

    return sendMessage(user.userId, {
      groupId,
      content: body.content,
    });
  },
  {
    roles: USER_ROLES,
  }
);