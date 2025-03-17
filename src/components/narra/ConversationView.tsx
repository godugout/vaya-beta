
import { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "./types";
import { MessageBubble } from "./MessageBubble";
import { NarraProcessingIndicator } from "./NarraProcessingIndicator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ConversationViewProps {
  messages: Message[];
  isProcessing: boolean;
}

export const ConversationView = ({ messages, isProcessing }: ConversationViewProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4 max-w-3xl mx-auto">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isProcessing && (
          <div className="flex justify-start items-start gap-3">
            <Avatar className="mt-0.5 bg-lovable-blue text-white">
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 max-w-[80%]">
              <NarraProcessingIndicator />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};
