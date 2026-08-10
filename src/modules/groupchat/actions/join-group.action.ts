import { GroupChatService } from "../services/groupchat.service";
const groupChatService = new GroupChatService();

export async function joinGroup(
  groupId: string,
  userId: string,
) {
  return groupChatService.joinGroup(
    groupId,
    userId
  );
}

