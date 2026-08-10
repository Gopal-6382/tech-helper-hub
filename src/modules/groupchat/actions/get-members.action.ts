import { GroupChatService } from "../services/groupchat.service";
const groupChatService = new GroupChatService();

export async function getMembers(groupId: string, userId: string) {
  return groupChatService.getMembers(groupId, userId);
}
