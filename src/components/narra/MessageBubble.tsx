
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { Message } from "./types";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isAssistant = message.role === "assistant";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex ${
        isAssistant ? "justify-start" : "justify-end"
      } items-start gap-3`}
    >
      {isAssistant && (
        <Avatar className="mt-0.5 bg-gradient-to-br from-lovable-blue to-indigo-600 text-white shadow-md">
          <AvatarFallback>N</AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          "max-w-[80%] rounded-2xl p-4 shadow-sm transition-all",
          isAssistant 
            ? "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 text-black dark:text-white rounded-tl-sm" 
            : "bg-gradient-to-br from-lovable-blue to-blue-600 text-white rounded-tr-sm"
        )}
      >
        <div className="text-sm md:text-base whitespace-pre-wrap leading-relaxed">
          {message.content}
        </div>

        {message.attachments?.map((attachment, i) => (
          <div key={i} className="mt-2 text-xs flex items-center gap-2 opacity-80">
            {attachment.type === "audio" && (
              <span className="px-2 py-1 rounded-full bg-black/10 dark:bg-white/10">
                Audio recording
              </span>
            )}
            {attachment.type === "image" && (
              <span className="px-2 py-1 rounded-full bg-black/10 dark:bg-white/10">
                Image attachment
              </span>
            )}
          </div>
        ))}

        <div className="mt-2 text-xs opacity-70 text-right">
          {message.timestamp?.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }) || ""}
        </div>
      </div>

      {!isAssistant && (
        <Avatar className="mt-0.5 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 shadow-md">
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </motion.div>
  );
};
