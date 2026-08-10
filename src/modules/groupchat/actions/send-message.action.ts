import { GroupChatService } from "../services/groupchat.service";
const groupChatService = new GroupChatService();
export async function sendMessage(
  userId: string,
  data: {
    groupId: string;
    content: string;
  },
) {
  return groupChatService.sendMessage({
    groupId: data.groupId,
    senderId: userId,
    content: data.content,
  });
}