import { GroupChatService } from "../services/groupchat.service";
const groupChatService = new GroupChatService();


export async function deleteMessage(
  messageId: string,
  userId: string,
) {
  return groupChatService.deleteMessage(
    messageId,
    userId,
  );
}