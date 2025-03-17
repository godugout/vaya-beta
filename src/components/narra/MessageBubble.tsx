
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { Message } from "./types";

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  return (
    <div
      className={`flex ${
        message.role === "assistant" ? "justify-start" : "justify-end"
      } items-start gap-3`}
    >
      {message.role === "assistant" && (
        <Avatar className="mt-0.5 bg-lovable-blue text-white">
          <AvatarFallback>N</AvatarFallback>
        </Avatar>
      )}

      <div
        className={`max-w-[80%] rounded-xl p-4 ${
          message.role === "assistant"
            ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
            : "bg-lovable-blue text-white"
        }`}
      >
        <div className="text-sm md:text-base whitespace-pre-wrap">
          {message.content}
        </div>

        {message.attachments?.map((attachment, i) => (
          <div key={i} className="mt-2 text-xs flex items-center gap-2">
            {attachment.type === "audio" && (
              <span>Audio recording</span>
            )}
            {attachment.type === "image" && (
              <span>Image attachment</span>
            )}
          </div>
        ))}

        <div className="mt-1 text-xs opacity-70 text-right">
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      {message.role === "user" && (
        <Avatar className="mt-0.5 bg-gray-200 dark:bg-gray-700">
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};
