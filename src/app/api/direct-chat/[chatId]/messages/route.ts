import { routeHandler } from "@/middleware/route.handler";
import { getMessages } from "@/modules/directchat/actions/get-messages.action";
import { sendMessage } from "@/modules/directchat/actions/send-message.action";
import { SendMessageDto } from "@/modules/directchat/types/direct-chat.types";
import { User } from "@/constant/roles.route.const";

type MessageRouteParams = {
  chatId: string;
};

export const GET = routeHandler<MessageRouteParams>(
  async (_req, _user, { params }) => {
    const { chatId } = await params;

    if (!chatId) {
      throw new Error("chatId is required");
    }

    return getMessages(chatId);
  },
User
);

export const POST = routeHandler<MessageRouteParams>(
  async (req, user, { params }) => {
    const { chatId } = await params;

    if (!chatId) {
      throw new Error("chatId is required");
    }

    const body: SendMessageDto = await req.json();

    return sendMessage(user.userId, chatId, {
      content: body.content,
    });
  },
User
);
