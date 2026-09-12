import { DirectChatService } from "../services/direct-chat.service";

const directChatService = new DirectChatService();

export async function getMessages(conversationId: string) {
  return directChatService.getMessages(conversationId);
}
