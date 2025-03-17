
import { Message } from "./types";
import { AudioWaveform, Image, Globe } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
  isSpanish: boolean;
}

const ChatMessage = ({ message, isSpanish }: ChatMessageProps) => {
  const isAI = message.role === "assistant";
  const [isMessageSpanish, setIsMessageSpanish] = useState(isSpanish);

  return (
    <motion.div 
      className={`flex ${isAI ? "justify-start" : "justify-end"} items-end gap-2 group mb-4`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Translation toggle button - appears on hover */}
      <div className={`opacity-0 group-hover:opacity-100 transition-opacity ${isAI ? "order-first" : "order-last"}`}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setIsMessageSpanish(!isMessageSpanish)}
              >
                <Globe className="h-4 w-4 text-greystone-green-40" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isMessageSpanish ? "View in English" : "Ver en Español"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div
        className={cn(
          "max-w-[80%] rounded-2xl p-4 shadow-sm",
          isAI
            ? "bg-gradient-to-br from-greystone-ui-gray to-greystone-ui-gray/90 text-greystone-green border-l-2 border-lovable-blue/40"
            : "bg-gradient-to-br from-lovable-blue to-blue-600 text-white border-r-2 border-blue-400/40"
        )}
      >
        <div className="text-sm md:text-base">
          {message.content}
        </div>
        
        {message.attachments?.map((attachment, index) => (
          <div key={index} className="mt-2 flex items-center gap-2">
            {attachment.type === "audio" ? (
              <>
                <AudioWaveform className="h-4 w-4" />
                <span className="text-sm">
                  {isMessageSpanish ? "Mensaje de audio" : "Audio message"}
                </span>
              </>
            ) : attachment.type === "image" ? (
              <>
                <Image className="h-4 w-4" />
                <span className="text-sm">
                  {isMessageSpanish ? "Imagen" : "Image"}
                </span>
              </>
            ) : null}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
