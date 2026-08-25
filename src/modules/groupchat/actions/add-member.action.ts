import { GroupChatService } from "../services/groupchat.service";
import { AddMemberData } from "../types/groupchat.types";
const groupChatService = new GroupChatService();

export async function addMember(
  data:AddMemberData
) {
  return groupChatService.addMember(data.groupId, data.requesterId, data.userId);
}
