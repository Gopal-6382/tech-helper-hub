"use client";

import type { DirectConversation } from "../types/direct-chat.types";
import { ConversationItem } from "./conversation-item";

type ConversationListProps = {
  conversations: DirectConversation[];
  currentUserId: string;
  selectedChatId?: string;
  onSelect: (chatId: string) => void;
  isLoading?: boolean;
};

export function ConversationList({
  conversations,
  currentUserId,
  selectedChatId,
  onSelect,
  isLoading = false,
}: ConversationListProps) {
  return (
    <aside className="flex h-full w-full flex-col border-r bg-background md:w-80">
      <div className="border-b px-4 py-4">
        <h2 className="text-lg font-semibold">Messages</h2>

        <p className="mt-1 text-sm text-muted-foreground">Your conversations</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="space-y-3 p-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex animate-pulse items-center gap-3"
              >
                <div className="size-11 rounded-full bg-muted" />

                <div className="flex-1 space-y-2">
                  <div className="h-3 w-32 rounded bg-muted" />
                  <div className="h-3 w-44 rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        ) : conversations.length === 0 ? (
          <div className="flex h-full items-center justify-center px-6 text-center">
            <div>
              <p className="font-medium">No conversations</p>

              <p className="mt-1 text-sm text-muted-foreground">
                Start a conversation with another user.
              </p>
            </div>
          </div>
        ) : (
          conversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              currentUserId={currentUserId}
              active={conversation.id === selectedChatId}
              onClick={() => onSelect(conversation.id)}
            />
          ))
        )}
      </div>
    </aside>
  );
}
