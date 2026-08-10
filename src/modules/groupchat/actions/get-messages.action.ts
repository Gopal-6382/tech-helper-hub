import { GroupChatService } from "../services/groupchat.service";
const groupChatService = new GroupChatService();
export async function getMessages(groupId: string, userId: string) {
  return groupChatService.getMessages(groupId, userId);
}
