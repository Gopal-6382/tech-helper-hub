import { GroupChatService } from "../services/groupchat.service";
import { updateGroupData } from "../types/groupchat.types";
const groupChatService = new GroupChatService();

export async function updateGroup(
  groupId: string,
  userId: string,
  data: updateGroupData,
) {
  return groupChatService.updateGroup(
    groupId,
    userId,
    data,
  );
}
