import { prisma } from "@/lib/prisma";
import { CreateMessageData } from "../types/direct-chat.types";

export class DirectChatRepository {
  // 🔹 User Checks

  async userExists(userId: string) {
    if (!userId) return false;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    return Boolean(user);
  }

  // 🔹 Conversations

  // Create conversation and participants in a single atomic database operation
  async createConversationWithParticipants(
    senderId: string,
    receiverId: string
  ) {
    return prisma.directConversation.create({
      data: {
        isActive: true,
        participants: {
          create: [{ userId: senderId }, { userId: receiverId }],
        },
      },
      include: {
        participants: true,
      },
    });
  }

  async findConversationById(conversationId: string) {
    if (!conversationId) return null;

    return prisma.directConversation.findUnique({
      where: { id: conversationId },
    });
  }

  async findConversationBetweenUsers(senderId: string, receiverId: string) {
    if (!senderId || !receiverId) return null;

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
    if (!userId) return [];

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
    if (!conversationId) return null;

    return prisma.directConversation.update({
      where: { id: conversationId },
      data: { lastMessageAt: new Date() },
    });
  }

  // 🔹 Participants

  async addParticipant(conversationId: string, userId: string) {
    if (!conversationId || !userId) return null;

    return prisma.directParticipant.create({
      data: { conversationId, userId },
    });
  }

  async getParticipants(conversationId: string) {
    if (!conversationId) return [];

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
    if (!conversationId || !userId) return null;

    return prisma.directParticipant.findFirst({
      where: { conversationId, userId },
    });
  }

  // 🔹 Messages

  async createMessage(data: CreateMessageData) {
    return prisma.directMessage.create({ data });
  }

  async findMessages(conversationId: string) {
    if (!conversationId) return [];

    return prisma.directMessage.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
    });
  }

  async findMessageById(messageId: string) {
    if (!messageId) return null;

    return prisma.directMessage.findUnique({
      where: { id: messageId },
    });
  }

  async markMessageRead(messageId: string) {
    if (!messageId) return null;

    return prisma.directMessage.update({
      where: { id: messageId },
      data: { readAt: new Date() },
    });
  }

  async deleteMessage(messageId: string) {
    if (!messageId) return null;

    return prisma.directMessage.delete({
      where: { id: messageId },
    });
  }
}