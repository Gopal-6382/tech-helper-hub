import { GroupChatService } from "../services/groupchat.service";
const groupChatService = new GroupChatService();

export async function deleteGroup(groupId: string, userId: string) {
  return groupChatService.deleteGroup(groupId, userId);
}
