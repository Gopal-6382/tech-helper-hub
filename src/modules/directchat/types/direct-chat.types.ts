export interface CreateConversationDto {
  receiverId: string;
}

export interface CreateConversationData {
  senderId: string;
  receiverId: string;
}

export interface SendMessageDto {
  content: string;
}

export interface CreateMessageData {
  conversationId: string;
  senderId: string;
  content: string;
}
