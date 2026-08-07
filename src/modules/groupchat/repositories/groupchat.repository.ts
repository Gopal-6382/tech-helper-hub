import { prisma } from "@/lib/prisma";
import {
  CreateGroupData,
  CreateGroupMessageData,
  updateGroupData,
} from "../types/groupchat.types";

export class GroupChatRepository {
  //create the group
  async createGroup(data: CreateGroupData) {
    return prisma.group.create({
      data,
    });
  }
  //find the groupe by id
  async findGroupById(id: string) {
    return prisma.group.findUnique({
      where: { id },
    });
  }
  //find the user groups by user id
  async findUserGroups(userId: string) {
    return prisma.group.findMany({
      where: {
        members: {
          some: { userId },
        },
        orderBy: { lastMessageAt: "desc" },
      },
    });
  }
  //update the group  by id
  async updateGroup(id: string, data: Partial<updateGroupData>) {
    return prisma.group.update({
      where: { id },
      data,
    });
  }
  //delete the group by id
  async deleteGroup(id: string) {
    return prisma.group.delete({
      where: { id },
    });
  }
  //update the last message time of the group
  async updateLastMessage(groupId: string, lastMessageAt: Date) {
    return prisma.group.update({
      where: { id: groupId },
      data: { lastMessageAt },
    });
  }
  //add the group member via user id and group id
  async addMember(groupId: string, userId: string) {
    return prisma.groupMember.create({
      data: {
        groupId,
        userId,
      },
    });
  }
  //remove the member from the group via user id and group id
  async removeMember(groupId: string, userId: string) {
    return prisma.groupMember.delete({
      where: {
        groupId_userId: {
          groupId,
          userId,
        },
      },
    });
  }
  //get the memebers of the group via group id
  async getMembers(groupId: string) {
    return prisma.groupMember.findMany({
      where: { groupId },
      include: {
        user: true,
        avatar: true,
        name: true,
      },
    });
  }
  //check the user is member of the group or not via user id and group id
  async isMember(groupId: string, userId: string) {
    return prisma.groupMember.findUnique({
      where: {
        groupId_userId: {
          groupId,
          userId,
        },
      },
    });
  }
  // check the user is admin of the group or not via user id and group id
  async isAdmin(groupId: string, userId: string) {
    return prisma.groupMember.findUnique({
      where: {
        groupId_userId: {
          groupId,
          userId,
        },
      },
      select: { isAdmin: true },
    });
  }
  //make the user admin of the group via user id and group id
  async makeAdmin(groupId: string, userId: string) {
    return prisma.groupMember.update({
      where: {
        groupId_userId: {
          groupId,
          userId,
        },
      },
      data: { isAdmin: true },
    });
  }
  //rmeove the user admin of the group via user id and group id
  async removeAdmin(groupId: string, userId: string) {
    return prisma.groupMember.update({
      where: {
        groupId_userId: {
          groupId,
          userId,
        },
      },
      data: { isAdmin: false },
    });
  }

  // create the group message via group id and sender id and content
  async createMessage(data: CreateGroupMessageData) {
    return prisma.groupMessage.create({
      data,
    });
  }
  // find the group message via group id and order by created at asc
  async findMessages(groupId: string) {
    return prisma.groupMessage.findMany({
      where: { groupId },
      orderBy: { createdAt: "asc" },
    });
  }
  //find the group message via message id
  async findMessageById(id: string) {
    return prisma.groupMessage.findUnique({
      where: { id },
    });
  }
  //update the group message via message id and content
  async updateMessage(id: string, data: Partial<{ content: string }>) {
    return prisma.groupMessage.update({
      where: { id },
      data,
    });
  }
  //delete the group message via message id
  async deleteMessage(id: string) {
    return prisma.groupMessage.delete({
      where: { id },
    });
  }
}
