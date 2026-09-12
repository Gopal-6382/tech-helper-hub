import { DirectChatService } from "../services/direct-chat.service";

const directChatService = new DirectChatService();

export async function getConversation(conversationId: string) {
  return directChatService.getConversationById(conversationId);
}
