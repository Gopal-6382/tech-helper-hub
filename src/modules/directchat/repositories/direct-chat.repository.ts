import { prisma } from "@/lib/prisma";
import { CreateMessageData } from "../types/direct-chat.types";

export class DirectChatRepository {
  // 🔹 Conversations

  async createConversation() {
    return prisma.directConversation.create({
      data: { isActive: true },
    });
  }

  async findConversationById(conversationId: string) {
    return prisma.directConversation.findUnique({
      where: { id: conversationId },
    });
  }

  async findConversationBetweenUsers(senderId: string, receiverId: string) {
    return prisma.directConversation.findFirst({
      where: {
        AND: [
          { participants: { some: { userId: senderId } } },
          { participants: { some: { userId: receiverId } } },
        ],
      },
    });
  }

  async findUserConversations(userId: string) {
    return prisma.directConversation.findMany({
      where: {
        participants: { some: { userId } },
      },
      include: {
        participants: true,
        messages: {
          take: 1,
          orderBy: { createdAt: "desc" },
        },
      },
    });
  }

  async updateLastMessage(conversationId: string) {
    return prisma.directConversation.update({
      where: { id: conversationId },
      data: { lastMessageAt: new Date() },
    });
  }

  // 🔹 Participants

  async addParticipant(conversationId: string, userId: string) {
    return prisma.directParticipant.create({
      data: { conversationId, userId },
    });
  }

  async getParticipants(conversationId: string) {
    return prisma.directParticipant.findMany({
      where: { conversationId },
      include: {
        user: {
          select: { id: true, name: true, avatar: true },
        },
      },
    });
  }

  async isParticipant(conversationId: string, userId: string) {
    return prisma.directParticipant.findFirst({
      where: { conversationId, userId },
    });
  }

  // 🔹 Messages

  async createMessage(data: CreateMessageData) {
    return prisma.directMessage.create({ data });
  }

  async findMessages(conversationId: string) {
    return prisma.directMessage.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
    });
  }

  async findMessageById(messageId: string) {
    return prisma.directMessage.findUnique({
      where: { id: messageId },
    });
  }

  async markMessageRead(messageId: string) {
    return prisma.directMessage.update({
      where: { id: messageId },
      data: { readAt: new Date() },
    });
  }

  async deleteMessage(messageId: string) {
    return prisma.directMessage.delete({
      where: { id: messageId },
    });
  }
}
