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

interface ChatMessageProps {
  message: Message;
  isSpanish: boolean;
}

const ChatMessage = ({ message, isSpanish }: ChatMessageProps) => {
  const isAI = message.role === "assistant";
  const [isMessageSpanish, setIsMessageSpanish] = useState(isSpanish);

  return (
    <div className={`flex ${isAI ? "justify-start" : "justify-end"} items-end gap-2 group`}>
      {/* Translation toggle button - appears on hover */}
      <div className={`opacity-0 group-hover:opacity-100 transition-opacity ${isAI ? "order-first" : "order-last"}`}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsMessageSpanish(!isMessageSpanish)}
              >
                <Globe className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isMessageSpanish ? "View in English" : "Ver en Español"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div
        className={`max-w-[80%] rounded-2xl p-4 ${
          isAI
            ? "bg-vaya-chat-bg text-vaya-gray-800"
            : "bg-vaya-secondary text-white"
        } shadow-sm animate-fadeIn`}
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
    </div>
  );
};

export default ChatMessage;