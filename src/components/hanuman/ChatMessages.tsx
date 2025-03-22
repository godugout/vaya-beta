
import React, { useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import { Message } from "@/components/narra/types";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isLoading }) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={chatContainerRef}
      className="flex-grow overflow-y-auto p-4 space-y-4"
    >
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex items-start gap-2 ${
            message.role === "user" ? "justify-end" : ""
          }`}
        >
          {message.role === "assistant" && (
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="Narra" />
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
          )}
          <Card
            className={`w-fit max-w-[80%] ${
              message.role === "user"
                ? "bg-lovable-blue text-white"
                : "bg-gray-100 dark:bg-gray-800"
            }`}
          >
            <CardContent className="p-3 break-words">
              {message.content}
            </CardContent>
          </Card>
        </div>
      ))}
      {isLoading && (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="Narra" />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
          <Card className="bg-gray-100 dark:bg-gray-800">
            <CardContent className="p-3">
              <Loader2 className="h-4 w-4 animate-spin" />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
