import { routeHandler } from "@/middleware/route.handler";

import { updateMessage } from "@/modules/groupchat/actions/update-message.action";
import { deleteMessage } from "@/modules/groupchat/actions/delete-message.action";

import { SendGroupMessageDto } from "@/modules/groupchat/types/groupchat.types";
import { USER_ROLES } from "@/constant/role.constant";

type MessageParams = {
  messageId: string;
};

export const PATCH = routeHandler<MessageParams>(
  async (req, user, { params }) => {
    const { messageId } = await params;

    const body: SendGroupMessageDto = await req.json();

    return updateMessage(messageId, user.userId, body.content);
  },
  {
    roles: USER_ROLES,
  },
);

export const DELETE = routeHandler<MessageParams>(
  async (req, user, { params }) => {
    const { messageId } = await params;

    return deleteMessage(messageId, user.userId);
  },
  {
    roles: USER_ROLES,
  },
);
