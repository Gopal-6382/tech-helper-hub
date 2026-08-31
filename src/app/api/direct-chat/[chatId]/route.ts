import { routeHandler } from "@/middleware/route.handler";
import { getConversation } from "@/modules/directchat/actions/get-chat.action";
import { createConversation } from "@/modules/directchat/actions/create-chat.action";
import { CreateConversationDto } from "@/modules/directchat/types/direct-chat.types";
import { createConversationSchema } from "@/modules/directchat/validations/direct-chat.validation";
import { User } from "@/constant/roles.route.const";

type ChatParams = {
  chatId: string;
};

export const GET = routeHandler<ChatParams>(async (_req, _user, { params }) => {
  const { chatId } = await params;
  if (!chatId) {
    throw new Error("chatId is required");
  }
  return getConversation(chatId);
}, User);

export const POST = routeHandler<ChatParams>(async (_req, user, { params }) => {
  const { chatId } = await params;
  if (!chatId) {
    throw new Error("chatId is required");
  }
  const data: CreateConversationDto = createConversationSchema.parse({
    receiverId: chatId,
  });
  return createConversation(user.userId, data);
}, User);
