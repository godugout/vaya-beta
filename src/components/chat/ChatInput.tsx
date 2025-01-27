import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic, MoreHorizontal } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSend: (messageContent?: { content: string; attachments?: { type: "audio" | "image"; url: string }[] }, isSpanish?: boolean) => void;
  handleMorePrompts: (isSpanish?: boolean) => void;
  setIsRecording: (value: boolean) => void;
  isSpanish: boolean;
}

const ChatInput = ({
  input,
  setInput,
  handleSend,
  handleMorePrompts,
  setIsRecording,
  isSpanish,
}: ChatInputProps) => {
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          placeholder={isSpanish ? "Comparte tu historia..." : "Share your story..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend(undefined, isSpanish)}
          className="flex-1 bg-white border-vaya-chat-border text-vaya-gray-800"
        />
        <Button
          onClick={() => handleSend(undefined, isSpanish)}
          size="icon"
          className="bg-vaya-primary hover:bg-vaya-primary/90 text-white"
        >
          <Send className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => setIsRecording(true)}
          size="icon"
          className="bg-vaya-secondary hover:bg-vaya-secondary/90 text-white"
        >
          <Mic className="h-4 w-4" />
        </Button>
      </div>
      <Button
        onClick={() => handleMorePrompts(isSpanish)}
        variant="ghost"
        className="w-full text-vaya-gray-600 hover:text-vaya-gray-800 hover:bg-vaya-chat-hover text-sm"
      >
        <MoreHorizontal className="h-5 w-5 mr-2" />
        {isSpanish ? "Más ideas para compartir" : "More ideas to share"}
      </Button>
    </div>
  );
};

export default ChatInput;