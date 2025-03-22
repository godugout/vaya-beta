
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
      style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23FF7A00' stroke-width='1' stroke-opacity='0.05'%3E%3Cpath d='M30 10 L50 45 L10 45 Z M15 25 L45 25 M12.5 35 L47.5 35'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}
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
            className={`w-fit max-w-[80%] shadow-md ${
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
            <CardContent className="p-3 flex items-center">
              <Loader2 className="h-4 w-4 animate-spin text-hanuman-primary" />
              <span className="ml-2 text-sm text-gray-500">Thinking...</span>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default ChatMessages;
