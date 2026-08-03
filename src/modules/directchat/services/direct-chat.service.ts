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
    if (data.senderId === data.receiverId) {
      throw new Error("You cannot create a conversation with yourself");
    }
    // validate receiverId
    createConversationSchema.parse({ receiverId: data.receiverId, senderId:data.senderId });
    const conversation = await this.directchat.findConversationBetweenUsers(
      data.senderId,
      data.receiverId,
    );
    // already exists
    if (conversation) {
      return conversation; 
    }
    const newConversation = await this.directchat.createConversation();

    // add both participants
    await this.directchat.addParticipant(newConversation.id, data.senderId);
    await this.directchat.addParticipant(newConversation.id, data.receiverId);

    return newConversation;
  }

  async getUserConversations(userId: string) {
    return this.directchat.findUserConversations(userId);
  }

  async getConversationById(conversationId: string) {
    const conversation =
      await this.directchat.findConversationById(conversationId);

    if (!conversation) {
      throw new Error("Conversation not found");
    }

    return conversation;
  }

  // 🔹 Messages

  async sendMessage(data: CreateMessageData) {
    sendMessageSchema.parse({ content: data.content });

    const conversation = await this.directchat.findConversationById(
      data.conversationId,
    );

    if (!conversation) {
      throw new Error("Conversation not found");
    }

    const participant = await this.directchat.isParticipant(
      data.conversationId,
      data.senderId,
    );

    if (!participant) {
      throw new Error("You are not a participant in this conversation");
    }

    const message = await this.directchat.createMessage(data);

    await this.directchat.updateLastMessage(data.conversationId);

    return message;
  }

  async getMessages(conversationId: string) {
    return this.directchat.findMessages(conversationId);
  }

  async markMessageRead(messageId: string) {
    const message = await this.directchat.findMessageById(messageId);

    if (!message) {
      throw new Error("Message not found");
    }

    return this.directchat.markMessageRead(messageId);
  }

  async deleteMessage(messageId: string) {
    const message = await this.directchat.findMessageById(messageId);

    if (!message) {
      throw new Error("Message not found");
    }
    return this.directchat.deleteMessage(messageId);
  }

  // 🔹 Participants

  async getParticipants(conversationId: string) {
    return this.directchat.getParticipants(conversationId);
  }

  async isParticipant(conversationId: string, userId: string) {
    return this.directchat.isParticipant(conversationId, userId);
  }
}
