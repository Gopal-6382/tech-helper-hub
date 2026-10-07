import { apiRequest } from "@/frontend/lib/api";

import type {
  CreateConversationInput,
  DirectConversation,
  DirectConversationDetails,
  DirectMessage,
  DirectConversationParticipant,
  SendMessageInput,
} from "../types/direct-chat.types";

const DIRECT_CHAT_BASE_URL = "/api/direct-chat";

export const directChatApi = {
  /**
   * GET /api/direct-chat/me
   */
  async getConversations(): Promise<DirectConversation[]> {
    const response = await apiRequest<DirectConversation[]>(
      `${DIRECT_CHAT_BASE_URL}/me`,
    );

    return response.data ?? [];
  },

  /**
   * GET /api/direct-chat/:chatId
   */
  async getConversation(
    chatId: string,
  ): Promise<DirectConversationDetails | null> {
    const response = await apiRequest<DirectConversationDetails>(
      `${DIRECT_CHAT_BASE_URL}/${chatId}`,
    );

    return response.data ?? null;
  },

  /**
   * POST /api/direct-chat/:receiverId
   *
   * Note:
   * Backend uses the [chatId] parameter as receiverId for POST.
   */
  async createConversation(
    receiverId: string,
  ): Promise<DirectConversationDetails | null> {
    const body: CreateConversationInput = {
      receiverId,
    };

    const response = await apiRequest<DirectConversationDetails>(
      `${DIRECT_CHAT_BASE_URL}/${receiverId}`,
      {
        method: "POST",
        body: JSON.stringify(body),
      },
    );

    return response.data ?? null;
  },

  /**
   * GET /api/direct-chat/:chatId/messages
   */
  async getMessages(chatId: string): Promise<DirectMessage[]> {
    const response = await apiRequest<DirectMessage[]>(
      `${DIRECT_CHAT_BASE_URL}/${chatId}/messages`,
    );

    return response.data ?? [];
  },

  /**
   * POST /api/direct-chat/:chatId/messages
   */
  async sendMessage(
    chatId: string,
    content: string,
  ): Promise<DirectMessage | null> {
    const body: SendMessageInput = {
      content,
    };

    const response = await apiRequest<DirectMessage>(
      `${DIRECT_CHAT_BASE_URL}/${chatId}/messages`,
      {
        method: "POST",
        body: JSON.stringify(body),
      },
    );

    return response.data ?? null;
  },

  /**
   * GET /api/direct-chat/:chatId/participants
   */
  async getParticipants(
    chatId: string,
  ): Promise<DirectConversationParticipant[]> {
    const response = await apiRequest<DirectConversationParticipant[]>(
      `${DIRECT_CHAT_BASE_URL}/${chatId}/participants`,
    );

    return response.data ?? [];
  },

  /**
   * PATCH /api/direct-chat/message/:messageId
   */
  async markMessageRead(messageId: string): Promise<DirectMessage | null> {
    const response = await apiRequest<DirectMessage>(
      `${DIRECT_CHAT_BASE_URL}/message/${messageId}`,
      {
        method: "PATCH",
      },
    );

    return response.data ?? null;
  },

  /**
   * DELETE /api/direct-chat/message/:messageId
   */
  async deleteMessage(messageId: string): Promise<void> {
    await apiRequest<void>(`${DIRECT_CHAT_BASE_URL}/message/${messageId}`, {
      method: "DELETE",
    });
  },
};
