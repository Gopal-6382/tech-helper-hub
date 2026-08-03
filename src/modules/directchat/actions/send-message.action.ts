import { DirectChatService } from "../services/direct-chat.service";
import { SendMessageDto } from "../types/direct-chat.types";

const directChatService = new DirectChatService();

export async function sendMessage(
  senderId: string,
  conversationId: string,
  data: SendMessageDto,
) {
  return directChatService.sendMessage({
    conversationId,
    senderId,
    content: data.content,
  });
}
