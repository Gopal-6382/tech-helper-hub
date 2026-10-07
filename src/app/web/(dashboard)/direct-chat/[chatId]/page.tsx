"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { ChatWindow } from "@/frontend/features/chats/components/chat-window";
import { useConversation } from "@/frontend/features/chats/hooks/use-conversation";
import { useDeleteMessage } from "@/frontend/features/chats/hooks/use-delete-message";
import { useMessages } from "@/frontend/features/chats/hooks/use-messages";
import { useSendMessage } from "@/frontend/features/chats/hooks/use-send-message";
import { useAuth } from "@/frontend/context/auth-context";
import type {
  DirectConversation,
  DirectMessage,
} from "@/frontend/features/chats/types/direct-chat.types";

export default function DirectChatConversationPage() {
  const params = useParams<{ chatId: string }>();
  const chatId = params.chatId;

  const { user } = useAuth();

  const { data: conversationData, isLoading: isConversationLoading } =
    useConversation(chatId);

  const { data: messagesData, isLoading: isMessagesLoading } =
    useMessages(chatId);

  const sendMessage = useSendMessage();
  const deleteMessage = useDeleteMessage();

  const conversation = (conversationData as DirectConversation | null) ?? null;

  const messages = (messagesData as DirectMessage[] | null) ?? [];

  if (!user?.id) {
    return null;
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col overflow-hidden rounded-lg border bg-background">
      <div className="border-b px-4 py-3">
        <Link
          href="/web/direct-chat"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to conversations
        </Link>
      </div>

      {isConversationLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Loading conversation...
          </p>
        </div>
      ) : (
        <ChatWindow
          conversation={conversation ?? undefined}
          messages={messages}
          currentUserId={user.id}
          isLoading={isMessagesLoading}
          isSending={sendMessage.isPending}
          onSendMessage={async (content) => {
            await sendMessage.mutateAsync({
              chatId,
              content,
            });
          }}
          onDeleteMessage={(messageId) => {
            deleteMessage.mutate({
              messageId,
              chatId,
            });
          }}
        />
      )}
    </div>
  );
}
