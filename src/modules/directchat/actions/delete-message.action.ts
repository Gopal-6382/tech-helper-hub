import { DirectChatService } from "../services/direct-chat.service";

const directChatService = new DirectChatService();

export async function deleteMessage(messageId: string) {
  return directChatService.deleteMessage(messageId);
}
