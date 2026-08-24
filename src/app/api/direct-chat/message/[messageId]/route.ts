import { routeHandler } from "@/middleware/route.handler";
import { deleteMessage } from "@/modules/directchat/actions/delete-message.action";
import { markMessageRead } from "@/modules/directchat/actions/mark-as-read.action";
import { USER_ROLES } from "@/constant/role.constant";

type MessageParams = {
  messageId: string;
};

export const PATCH = routeHandler<MessageParams>(
  async (_req, _user, { params }) => {
    const { messageId } = await params;
    if (!messageId) {
      throw new Error("messageId is required");
    }

    return markMessageRead(messageId);
  },
  {
    roles: USER_ROLES,
  },
);

export const DELETE = routeHandler<MessageParams>(
  async (_req, _user, { params }) => {
    const { messageId } = await params;

    if (!messageId) {
      throw new Error("messageId is required");
    }

    return deleteMessage(messageId);
  },
  {
    roles: USER_ROLES,
  },
);
