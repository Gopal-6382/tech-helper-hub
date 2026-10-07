"use client";

import { useRouter } from "next/navigation";

import { ConversationList } from "@/frontend/features/chats/components/conversation-list";
import { useConversations } from "@/frontend/features/chats/hooks/use-conversations";
import type { DirectConversation } from "@/frontend/features/chats/types/direct-chat.types";
import { useAuth } from "@/frontend/context/auth-context";

export default function DirectChatPage() {
  const router = useRouter();
  const { user } = useAuth();

  const { data, isLoading, isError } = useConversations();

  const conversations = data ?? [];

  if (!user?.id) {
    return null;
  }

  return (
    <div className="h-[calc(100vh-8rem)] overflow-hidden rounded-lg border bg-background">
      {isError ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-sm text-destructive">
            Failed to load conversations.
          </p>
        </div>
      ) : (
        <ConversationList
          currentUserId={user.id}
          conversations={conversations as DirectConversation[]}
          isLoading={isLoading}
          onSelect={(chatId) => {
            router.push(`/web/direct-chat/${chatId}`);
          }}
        />
      )}
    </div>
  );
}
