import { Message } from "./types";
import { AudioWaveform, Image } from "lucide-react";

interface ChatMessageProps {
  message: Message;
  isSpanish: boolean;
}

const ChatMessage = ({ message, isSpanish }: ChatMessageProps) => {
  const isAI = message.role === "assistant";

  return (
    <div className={`flex ${isAI ? "justify-start" : "justify-end"} items-end gap-2`}>
      <div
        className={`max-w-[80%] rounded-2xl p-4 ${
          isAI
            ? "bg-gray-100 text-vaya-gray-800"
            : "bg-vaya-primary text-white"
        } shadow-sm animate-fadeIn`}
      >
        <div className="text-sm md:text-base">
          {message.content}
          {/* Note: In a production environment, you would implement actual translation here */}
        </div>
        
        {message.attachments?.map((attachment, index) => (
          <div key={index} className="mt-2 flex items-center gap-2">
            {attachment.type === "audio" ? (
              <>
                <AudioWaveform className="h-4 w-4" />
                <span className="text-sm">
                  {isSpanish ? "Mensaje de audio" : "Audio message"}
                </span>
              </>
            ) : attachment.type === "image" ? (
              <>
                <Image className="h-4 w-4" />
                <span className="text-sm">
                  {isSpanish ? "Imagen" : "Image"}
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