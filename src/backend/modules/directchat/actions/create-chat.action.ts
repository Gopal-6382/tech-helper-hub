import { DirectChatService } from "../services/direct-chat.service";
import { CreateConversationDto } from "../types/direct-chat.types";

const directChatService = new DirectChatService();

export async function createConversation(
  senderId: string,
  data: CreateConversationDto,
) {
  return directChatService.createConversation({
    senderId,
    receiverId: data.receiverId,
  });
}
