import { GroupChatRepository } from "../repositories/groupchat.repository";
import {
  CreateGroupData,
  CreateGroupMessageData,
} from "../types/groupchat.types";
import {
  createGroupSchema,
  CreateGroupMessage,
} from "../validations/groupchat.validations";

export class GroupChatService {
  private groupChat = new GroupChatRepository();

  // PRIVATE HELPERS

  private async requireGroup(groupId: string) {
    const group = await this.groupChat.findGroupById(groupId);

    if (!group) {
      throw new Error("Group not found");
    }

    return group;
  }

  private async requireMember(groupId: string, userId: string) {
    const member = await this.groupChat.isMember(groupId, userId);

    if (!member) {
      throw new Error("User is not a member of this group");
    }

    return member;
  }

  private async requireOwner(groupId: string, userId: string) {
    const group = await this.requireGroup(groupId);

    if (group.ownerId !== userId) {
      throw new Error("Only the group owner can perform this action");
    }

    return group;
  }

  private async requireAdmin(groupId: string, userId: string) {
    await this.requireGroup(groupId);

    const member = await this.groupChat.isAdmin(groupId, userId);

    if (!member?.isAdmin) {
      throw new Error("Only a group admin can perform this action");
    }

    return member;
  }

  // GROUP

  async createGroup(data: CreateGroupData) {
    const validatedData = createGroupSchema.parse(data);

    const group = await this.groupChat.createGroup(validatedData);

    // Creator automatically becomes a member.
    await this.groupChat.addMember(group.id, group.ownerId);

    // Creator is the admin.
    await this.groupChat.makeAdmin(group.id, group.ownerId);

    return group;
  }

  async getGroup(groupId: string) {
    return this.requireGroup(groupId);
  }

  async getMyGroups(userId: string) {
    return this.groupChat.findUserGroups(userId);
  }

  async updateGroup(
    groupId: string,
    userId: string,
    data: Partial<{
      name: string;
      description: string;
      image: string;
    }>,
  ) {
    // MVP: only owner can modify group information.
    const group = await this.requireOwner(groupId, userId);

    const validatedData = createGroupSchema.partial().parse(data);

    return this.groupChat.updateGroup(group.id, validatedData);
  }

  async deleteGroup(groupId: string, userId: string) {
    const group = await this.requireOwner(groupId, userId);

    return this.groupChat.deleteGroup(group.id);
  }

  // MEMBERS

  async joinGroup(groupId: string, userId: string) {
    await this.requireGroup(groupId);

    const existingMember = await this.groupChat.isMember(groupId, userId);

    if (existingMember) {
      throw new Error("User is already a member");
    }

    return this.groupChat.addMember(groupId, userId);
  }

  async leaveGroup(groupId: string, userId: string) {
    const group = await this.requireGroup(groupId);

    // Owner cannot simply leave his own group.
    if (group.ownerId === userId) {
      throw new Error("Group owner cannot leave the group");
    }

    await this.requireMember(groupId, userId);

    return this.groupChat.removeMember(groupId, userId);
  }

  async addMember(groupId: string, requesterId: string, userId: string) {
    // MVP: owner/admin can add members.
    await this.requireAdmin(groupId, requesterId);

    const existingMember = await this.groupChat.isMember(groupId, userId);

    if (existingMember) {
      throw new Error("User is already a member");
    }

    return this.groupChat.addMember(groupId, userId);
  }

  async removeMember(groupId: string, requesterId: string, userId: string) {
    const group = await this.requireGroup(groupId);

    await this.requireAdmin(groupId, requesterId);

    if (group.ownerId === userId) {
      throw new Error("Group owner cannot be removed");
    }

    await this.requireMember(groupId, userId);

    return this.groupChat.removeMember(groupId, userId);
  }

  async getMembers(groupId: string, userId: string) {
    await this.requireGroup(groupId);

    // Only members can see group members.
    await this.requireMember(groupId, userId);

    return this.groupChat.getMembers(groupId);
  }

  // ADMIN

  async makeAdmin(groupId: string, requesterId: string, userId: string) {
    // MVP: ONLY OWNER can make admins.
    await this.requireOwner(groupId, requesterId);

    await this.requireMember(groupId, userId);

    const currentAdmin = await this.groupChat.isAdmin(groupId, userId);

    if (currentAdmin?.isAdmin) {
      throw new Error("User is already an admin");
    }

    return this.groupChat.makeAdmin(groupId, userId);
  }

  async removeAdmin(groupId: string, requesterId: string, userId: string) {
    const group = await this.requireOwner(groupId, requesterId);

    // Owner should remain the owner/admin.
    if (group.ownerId === userId) {
      throw new Error("Group owner cannot lose admin privileges");
    }

    await this.requireMember(groupId, userId);

    const currentAdmin = await this.groupChat.isAdmin(groupId, userId);

    if (!currentAdmin?.isAdmin) {
      throw new Error("User is not an admin");
    }

    return this.groupChat.removeAdmin(groupId, userId);
  }

  // MESSAGES

  async sendMessage(data: CreateGroupMessageData) {
    const validatedData = CreateGroupMessage.parse(data);

    await this.requireGroup(validatedData.groupId);

    await this.requireMember(validatedData.groupId, validatedData.senderId);

    const message = await this.groupChat.createMessage(validatedData);

    await this.groupChat.updateLastMessage(validatedData.groupId, new Date());

    return message;
  }

  async getMessages(groupId: string, userId: string) {
    await this.requireGroup(groupId);

    await this.requireMember(groupId, userId);

    return this.groupChat.findMessages(groupId);
  }

  async updateMessage(
    messageId: string,
    userId: string,
    data: Partial<{ content: string }>,
  ) {
    const message = await this.groupChat.findMessageById(messageId);

    if (!message) {
      throw new Error("Message not found");
    }

    // MVP: only sender can edit.
    if (message.senderId !== userId) {
      throw new Error("You can only edit your own message");
    }

    const validatedData = CreateGroupMessage
      .pick({ content: true })
      .partial()
      .parse(data);

    return this.groupChat.updateMessage(messageId, validatedData);
  }

  async deleteMessage(messageId: string, userId: string) {
    const message = await this.groupChat.findMessageById(messageId);

    if (!message) {
      throw new Error("Message not found");
    }

    // MVP: sender can delete own message.
    // Admin/owner deletion can be added later.
    if (message.senderId !== userId) {
      throw new Error("You can only delete your own message");
    }

    return this.groupChat.deleteMessage(messageId);
  }
}
