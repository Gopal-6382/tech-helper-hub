import { DirectChatService } from "../services/direct-chat.service";

const directChatService = new DirectChatService();

export async function markMessageRead(messageId: string) {
  return directChatService.markMessageRead(messageId);
}
