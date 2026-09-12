import { GroupChatService } from "../services/groupchat.service";
const groupChatService = new GroupChatService();

export async function removeAdmin(
  groupId: string,
  requesterId: string,
  userId: string,
) {
  return groupChatService.removeAdmin(groupId, requesterId, userId);
}
