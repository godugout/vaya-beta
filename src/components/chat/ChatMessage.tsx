
import { Message } from "./types";
import { AudioWaveform, Image, Globe, Play, Pause } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";

interface ChatMessageProps {
  message: Message;
  isSpanish: boolean;
}

const ChatMessage = ({ message, isSpanish }: ChatMessageProps) => {
  const isAI = message.role === "assistant";
  const [isMessageSpanish, setIsMessageSpanish] = useState(isSpanish);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const hasAudioAttachment = message.attachments?.some(
    (attachment) => attachment.type === "audio"
  );
  
  const audioAttachment = message.attachments?.find(
    (attachment) => attachment.type === "audio"
  );
  
  const toggleAudioPlayback = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
      });
      setIsPlaying(true);
    }
  };
  
  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className={`flex ${isAI ? "justify-start" : "justify-end"} items-end gap-2 group mb-4`}>
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
        className={`max-w-[80%] rounded-2xl p-4 ${
          isAI
            ? "bg-greystone-ui-gray text-greystone-green"
            : "bg-lovable-blue text-white"
        } shadow-sm animate-fadeIn`}
      >
        <div className="text-sm md:text-base mb-2">
          {message.content}
        </div>
        
        {hasAudioAttachment && audioAttachment && (
          <div className="mt-3 border-t pt-3 border-gray-200 dark:border-gray-700">
            {audioRef.current && (
              <audio
                ref={audioRef}
                src={audioAttachment.url}
                onEnded={handleAudioEnded}
                className="hidden"
              />
            )}
            
            <div className="flex items-center gap-2">
              <Button
                onClick={toggleAudioPlayback}
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 rounded-full"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
              
              <div className="flex-1">
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${isAI ? "bg-greystone-green-40" : "bg-white"}`}
                    style={{ width: isPlaying ? "100%" : "0%" }}
                  />
                </div>
              </div>
              
              <span className="text-xs opacity-70">
                {isMessageSpanish ? "Audio" : "Audio"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
