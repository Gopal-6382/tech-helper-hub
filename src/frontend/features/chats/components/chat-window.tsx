"use client";

import Image from "next/image";

import { useParticipants } from "../hooks/use-participants";
import type {
  DirectConversationDetails,
  DirectMessage,
} from "../types/direct-chat.types";
import { MessageForm } from "./message-form";
import { MessageList } from "./message-list";

type ChatWindowProps = {
  conversation?: DirectConversationDetails | null;
  messages: DirectMessage[];
  currentUserId: string;
  isLoading?: boolean;
  isSending?: boolean;
  onSendMessage: (content: string) => Promise<void> | void;
  onDeleteMessage?: (messageId: string) => void;
};

export function ChatWindow({
  conversation,
  messages,
  currentUserId,
  isLoading = false,
  isSending = false,
  onSendMessage,
  onDeleteMessage,
}: ChatWindowProps) {
  const { data: participants } = useParticipants(conversation?.id ?? "");

  if (!conversation) {
    return (
      <section className="flex min-h-0 min-w-0 flex-1 items-center justify-center bg-muted/10">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Select a conversation</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Choose a conversation from the left.
          </p>
        </div>
      </section>
    );
  }

  const otherParticipant =
    participants?.find((participant) => participant.userId !== currentUserId) ??
    null;

  const participantName = otherParticipant?.user?.name?.trim() || "User";

  const participantAvatar = otherParticipant?.user?.avatar || null;

  return (
    <section className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-muted/10">
      {/* Header - fixed */}
      <header className="flex min-h-16 shrink-0 items-center gap-3 border-b bg-background px-4 sm:px-6">
        <div className="relative size-10 shrink-0 overflow-hidden rounded-full bg-primary/10">
          {participantAvatar ? (
            <Image
              src={participantAvatar}
              alt={participantName}
              fill
              sizes="40px"
              className="object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-sm font-semibold text-primary">
              {participantName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold">
            {participantName}
          </h2>

          <p className="text-xs text-muted-foreground">Direct message</p>
        </div>
      </header>

      {/* Messages - only this section scrolls */}
      <MessageList
        messages={messages}
        currentUserId={currentUserId}
        isLoading={isLoading}
        onDelete={onDeleteMessage}
      />

      {/* Form - fixed */}
      <div className="shrink-0">
        <MessageForm onSend={onSendMessage} isSending={isSending} />
      </div>
    </section>
  );
}
