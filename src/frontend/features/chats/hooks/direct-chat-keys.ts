export const directChatKeys = {
  all: ["direct-chats"] as const,

  conversations: () => [...directChatKeys.all, "conversations"] as const,

  conversation: (chatId: string) =>
    [...directChatKeys.all, "conversation", chatId] as const,

  messages: (chatId: string) =>
    [...directChatKeys.all, "messages", chatId] as const,

  participants: (chatId: string) =>
    [...directChatKeys.all, "participants", chatId] as const,
};
