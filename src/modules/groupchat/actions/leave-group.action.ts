import { GroupChatService } from "../services/groupchat.service";
const groupChatService = new GroupChatService();

export async function leaveGroup(groupId: string, userId: string) {
  return groupChatService.leaveGroup(groupId, userId);
}
