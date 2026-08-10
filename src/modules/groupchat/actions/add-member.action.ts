import { GroupChatService } from "../services/groupchat.service";
const groupChatService = new GroupChatService();

export async function addMember(
  groupId: string,
  requesterId: string,
  userId: string,
) {
  return groupChatService.addMember(groupId, requesterId, userId);
}
