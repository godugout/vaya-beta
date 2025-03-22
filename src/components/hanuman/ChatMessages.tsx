
import React, { useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import { HanumanMessage } from "@/types/hanuman";
import { motion } from "framer-motion";

interface ChatMessagesProps {
  messages: HanumanMessage[];
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
      className="flex-grow overflow-y-auto p-4 space-y-4 bg-pattern-subtle"
    >
      {messages.map((message, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`flex items-start gap-2 ${
            message.role === "user" ? "justify-end" : ""
          }`}
        >
          {message.role === "assistant" && (
            <Avatar className="h-8 w-8 border-2 border-hanuman-primary/20">
              <AvatarImage src="/assets/hanuman-avatar.png" alt="Hanuman" />
              <AvatarFallback className="bg-hanuman-primary text-white">H</AvatarFallback>
            </Avatar>
          )}
          <Card
            className={`w-fit max-w-[80%] ${
              message.role === "user"
                ? "bg-hanuman-primary text-white dark:bg-hanuman-primary dark:text-white"
                : "bg-white dark:bg-gray-800 border-hanuman-accent/20"
            }`}
          >
            <CardContent className="p-3 break-words">
              {message.content}
            </CardContent>
          </Card>
        </motion.div>
      ))}
      {isLoading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2"
        >
          <Avatar className="h-8 w-8 border-2 border-hanuman-primary/20">
            <AvatarImage src="/assets/hanuman-avatar.png" alt="Hanuman" />
            <AvatarFallback className="bg-hanuman-primary text-white">H</AvatarFallback>
          </Avatar>
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-3">
              <Loader2 className="h-4 w-4 animate-spin text-hanuman-primary" />
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default ChatMessages;
