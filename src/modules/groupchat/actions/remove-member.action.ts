import { GroupChatService } from "../services/groupchat.service";
const groupChatService = new GroupChatService();

export async function removeMember(
  groupId: string,
  requesterId:string,
  userId: string,
) {
  return groupChatService.removeMember(
    groupId,
    requesterId,
    userId
  );
}
