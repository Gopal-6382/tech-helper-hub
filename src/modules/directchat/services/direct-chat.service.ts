import { DirectChatRepository } from "../repositories/direct-chat.repository";
import {
  createConversationSchema,
  sendMessageSchema,
} from "../validations/direct-chat.validation";
import {
  CreateConversationData,
  CreateMessageData,
} from "../types/direct-chat.types";

export class DirectChatService {
  private directchat = new DirectChatRepository();

  // 🔹 Conversations

  async createConversation(data: CreateConversationData) {
    const { senderId, receiverId } = data || {};

    if (!senderId || !receiverId) {
      throw new Error("Both senderId and receiverId are required");
    }

    if (senderId === receiverId) {
      throw new Error("You cannot create a conversation with yourself");
    }

    // Validate payload against Zod schema
    createConversationSchema.parse({ receiverId, senderId });

    // 1. Validate both users exist in the database
    const [senderExists, receiverExists] = await Promise.all([
      this.directchat.userExists(senderId),
      this.directchat.userExists(receiverId),
    ]);

    if (!senderExists) {
      throw new Error(`Sender user with ID '${senderId}' does not exist`);
    }

    if (!receiverExists) {
      throw new Error(`Receiver user with ID '${receiverId}' does not exist`);
    }

    // 2. Check if a conversation already exists
    const existingConversation =
      await this.directchat.findConversationBetweenUsers(senderId, receiverId);

    if (existingConversation) {
      return existingConversation;
    }

    // 3. Create conversation and participants atomically in a transaction
    return this.directchat.createConversationWithParticipants(
      senderId,
      receiverId
    );
  }

  async getUserConversations(userId: string) {
    if (!userId) throw new Error("userId is required");
    return this.directchat.findUserConversations(userId);
  }

  async getConversationById(conversationId: string) {
    if (!conversationId) throw new Error("conversationId is required");

    const conversation =
      await this.directchat.findConversationById(conversationId);

    if (!conversation) {
      throw new Error("Conversation not found");
    }

    return conversation;
  }

  // 🔹 Messages

  async sendMessage(data: CreateMessageData) {
    if (!data?.conversationId || !data?.senderId) {
      throw new Error("conversationId and senderId are required");
    }

    sendMessageSchema.parse({ content: data.content });

    const conversation = await this.directchat.findConversationById(
      data.conversationId
    );

    if (!conversation) {
      throw new Error("Conversation not found");
    }

    const participant = await this.directchat.isParticipant(
      data.conversationId,
      data.senderId
    );

    if (!participant) {
      throw new Error("You are not a participant in this conversation");
    }

    const message = await this.directchat.createMessage(data);
    await this.directchat.updateLastMessage(data.conversationId);

    return message;
  }

  async getMessages(conversationId: string) {
    if (!conversationId) throw new Error("conversationId is required");
    return this.directchat.findMessages(conversationId);
  }

  async markMessageRead(messageId: string) {
    if (!messageId) throw new Error("messageId is required");

    const message = await this.directchat.findMessageById(messageId);
    if (!message) {
      throw new Error("Message not found");
    }

    return this.directchat.markMessageRead(messageId);
  }

  async deleteMessage(messageId: string) {
    if (!messageId) throw new Error("messageId is required");

    const message = await this.directchat.findMessageById(messageId);
    if (!message) {
      throw new Error("Message not found");
    }

    return this.directchat.deleteMessage(messageId);
  }

  // 🔹 Participants

  async getParticipants(conversationId: string) {
    if (!conversationId) throw new Error("conversationId is required");
    return this.directchat.getParticipants(conversationId);
  }

  async isParticipant(conversationId: string, userId: string) {
    if (!conversationId || !userId) return false;
    return this.directchat.isParticipant(conversationId, userId);
  }
}