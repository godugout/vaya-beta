
import { motion } from "framer-motion";
import { Message } from "./types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import AudioPreview from "@/components/audio/AudioPreview";
import { User } from "lucide-react";

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === "user";
  
  return (
    <motion.div
      className={`flex ${isUser ? "justify-end" : "justify-start"} items-start gap-3`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {!isUser && (
        <Avatar className="mt-0.5 bg-lovable-blue text-white">
          <AvatarFallback>N</AvatarFallback>
        </Avatar>
      )}
      
      <div className={`${isUser ? "ml-12" : "mr-12"} max-w-[80%]`}>
        <Card className={`p-4 ${
          isUser 
            ? "bg-lovable-blue/10 dark:bg-lovable-blue/20 border-lovable-blue/20" 
            : "bg-gray-100 dark:bg-gray-800"
        }`}>
          <div className="space-y-3">
            <div className="whitespace-pre-wrap text-sm">
              {message.content}
            </div>
            
            {message.attachments?.map((attachment, i) => (
              <div key={i} className="mt-2">
                {attachment.type === "audio" && (
                  <AudioPreview audioBlob={new Blob()} />
                )}
                {attachment.type === "image" && (
                  <img 
                    src={attachment.url} 
                    alt="Attachment" 
                    className="rounded-md max-w-full" 
                  />
                )}
              </div>
            ))}
          </div>
        </Card>
        
        <div className="text-xs text-gray-500 mt-1 ml-1">
          {message.timestamp ? (
            new Date(message.timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })
          ) : (
            new Date().toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })
          )}
        </div>
      </div>
      
      {isUser && (
        <Avatar className="mt-0.5 bg-gray-200 dark:bg-gray-700">
          <AvatarFallback>
            <User className="h-4 w-4 text-gray-500" />
          </AvatarFallback>
        </Avatar>
      )}
    </motion.div>
  );
};
