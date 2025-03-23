
import React, { useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Flower, Loader2 } from "lucide-react";
import { HanumanMessage } from "@/types/hanuman";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface ChatMessagesProps {
  messages: HanumanMessage[];
  isLoading: boolean;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isLoading }) => {
  const { isSpanish } = useLanguage();
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
      className="chat-body"
    >
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center p-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-hanuman-primary/10"
          >
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-hanuman-primary/20 to-hanuman-accent/20 flex items-center justify-center">
                <Avatar className="h-14 w-14 border-2 border-hanuman-primary/40">
                  <AvatarImage src="/assets/hanuman-avatar.png" alt="Hanuman" />
                  <AvatarFallback className="bg-hanuman-primary text-white">
                    <Flower size={24} />
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-hanuman-primary mb-2">
              {isSpanish ? "Comienza tu conversación sagrada" : "Begin your sacred conversation"}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {isSpanish 
                ? "Comparte las historias de tu familia y preserva tu herencia a través de un diálogo significativo" 
                : "Share your family stories and preserve your heritage through meaningful dialogue"}
            </p>
            <div className="text-sm text-gray-500 bg-hanuman-primary/5 p-3 rounded-lg border border-hanuman-primary/10">
              {isSpanish 
                ? "Selecciona una categoría o pregunta sugerida para empezar" 
                : "Select a category or suggested prompt to begin"}
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-start gap-3 ${
                message.role === "user" ? "justify-end" : ""
              }`}
            >
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8 border-2 border-hanuman-primary/20 mt-1">
                  <AvatarImage src="/assets/hanuman-avatar.png" alt="Hanuman" />
                  <AvatarFallback className="bg-hanuman-primary text-white">H</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                  message.role === "user"
                    ? "bg-hanuman-primary text-white"
                    : "bg-white dark:bg-gray-800 border border-hanuman-accent/20"
                }`}
              >
                <div className="whitespace-pre-wrap break-words text-sm">
                  {message.content}
                </div>
              </div>
              {message.role === "user" && (
                <Avatar className="h-8 w-8 bg-hanuman-purple/20 border-2 border-hanuman-purple/20 mt-1">
                  <AvatarFallback className="text-hanuman-purple">
                    {isSpanish ? "U" : "Y"}  
                  </AvatarFallback>
                </Avatar>
              )}
            </motion.div>
          ))}
        </div>
      )}
      
      {isLoading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-start gap-3 mt-4"
        >
          <Avatar className="h-8 w-8 border-2 border-hanuman-primary/20 mt-1">
            <AvatarImage src="/assets/hanuman-avatar.png" alt="Hanuman" />
            <AvatarFallback className="bg-hanuman-primary text-white">H</AvatarFallback>
          </Avatar>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-3 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-hanuman-primary" />
              <span className="text-sm text-gray-500">{isSpanish ? "Pensando..." : "Thinking..."}</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ChatMessages;
