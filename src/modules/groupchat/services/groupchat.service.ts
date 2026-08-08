import { GroupChatRepository } from "../repositories/groupchat.repository";
import { CreateGroupData } from "../types/groupchat.types";
import { createGroupSchema } from "../validations/groupchat.validations";
export class GroupChatService {
  private GroupChat = new GroupChatRepository();
  async createGroup(data: CreateGroupData) {
    const validatedData = createGroupSchema.parse(data);
    return this.GroupChat.createGroup(validatedData);
  }
}
