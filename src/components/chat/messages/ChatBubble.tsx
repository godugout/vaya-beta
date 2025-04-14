
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatBubbleProps {
  content: string;
  isUser?: boolean;
  timestamp?: Date;
  avatar?: {
    src?: string;
    fallback: string;
  };
}

export const ChatBubble = ({
  content,
  isUser = false,
  timestamp,
  avatar
}: ChatBubbleProps) => {
  return (
    <div className={cn(
      "flex items-start gap-2",
      isUser ? "flex-row-reverse" : "flex-row"
    )}>
      <Avatar className="h-8 w-8 flex-shrink-0">
        {avatar?.src ? (
          <AvatarImage src={avatar.src} alt={avatar.fallback} />
        ) : (
          <AvatarFallback>{avatar?.fallback}</AvatarFallback>
        )}
      </Avatar>
      
      <div className={cn(
        "max-w-[75%] flex flex-col",
        isUser ? "items-end" : "items-start"
      )}>
        <div className={cn(
          "rounded-2xl px-4 py-2 inline-block",
          isUser 
            ? "bg-indigo-600 text-white rounded-br-sm" 
            : "bg-gray-100 dark:bg-gray-800 rounded-bl-sm"
        )}>
          {content}
        </div>
        
        {timestamp && (
          <span className="text-xs text-gray-500 mt-1">
            {timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        )}
      </div>
    </div>
  );
};
