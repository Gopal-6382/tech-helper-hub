import { DirectChatService } from "../services/direct-chat.service";

const directChatService = new DirectChatService();

export async function getUserConversations(userId: string) {
  return directChatService.getUserConversations(userId);
}
