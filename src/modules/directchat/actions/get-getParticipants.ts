import { DirectChatService } from "../services/direct-chat.service";

const directChatService = new DirectChatService();

export async function getParticipants(conversationId: string) {
  return directChatService.getParticipants(conversationId);
}
