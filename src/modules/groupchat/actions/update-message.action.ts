import { GroupChatService } from "../services/groupchat.service";
const groupChatService = new GroupChatService();
export async function updateMessage(
    messageId: string,
  userId: string,
    content: string,
) {
  return groupChatService.updateMessage(
    messageId,
    userId,
    { content },
  );
}