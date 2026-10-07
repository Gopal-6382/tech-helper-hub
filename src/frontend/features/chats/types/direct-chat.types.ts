import type {
  CreateConversationDto,
  SendMessageDto,
} from "@/backend/modules/directchat/types/direct-chat.types";

export type { CreateConversationDto, SendMessageDto };

export type ChatId = string;
export type MessageId = string;
export type UserId = string;

export type CreateConversationInput = CreateConversationDto;

export type SendMessageInput = SendMessageDto;

export type MarkMessageReadInput = {
  messageId: MessageId;
};

export type DeleteMessageInput = {
  messageId: MessageId;
};

export type DirectParticipant = {
  id: string;
  conversationId: string;
  userId: string;
};

export type DirectUser = {
  id: string;
  name: string;
  avatar?: string | null;
};

export type DirectParticipantWithUser = DirectParticipant & {
  user: DirectUser;
};

export type DirectMessage = {
  id: string;
  conversationId: string;
  senderId: string;
  content: string | null;
  readAt: string | null;
  createdAt: string;
};

export type DirectConversation = {
  id: string;
  lastMessageAt: string | null;
  isActive: boolean;
  createdAt: string;
  participants: DirectParticipant[];
  messages: DirectMessage[];
};

export type DirectConversationDetails = {
  id: string;
  lastMessageAt: string | null;
  isActive: boolean;
  createdAt: string;
};

export type DirectConversationParticipant = DirectParticipantWithUser;

export type SendMessageFormValues = {
  content: string;
};
