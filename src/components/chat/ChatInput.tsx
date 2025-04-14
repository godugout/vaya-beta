
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
    <div className="space-y-2 px-4 py-3 border-t border-gray-100">
      <div className="flex gap-2">
        <Input
          placeholder={isSpanish ? "Comparte tu historia..." : "Share your story..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend(undefined, isSpanish)}
          className="flex-1 bg-greystone-ui-gray border-none text-greystone-green rounded-xl py-3 px-4"
        />
        <Button
          onClick={() => handleSend(undefined, isSpanish)}
          size="icon"
          className="bg-lovable-blue hover:bg-lovable-blue-bright text-white rounded-full"
        >
          <Send className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => setIsRecording(true)}
          size="icon"
          className="bg-lovable-magenta hover:bg-lovable-magenta-bright text-white rounded-full"
        >
          <Mic className="h-4 w-4" />
        </Button>
      </div>
      <Button
        onClick={() => handleMorePrompts(isSpanish)}
        variant="ghost"
        className="w-full text-greystone-green-40 hover:text-greystone-green hover:bg-greystone-ui-gray text-sm"
      >
        <MoreHorizontal className="h-5 w-5 mr-2" />
        {isSpanish ? "Más ideas para compartir" : "More ideas to share"}
      </Button>
    </div>
  );
};

export default ChatInput;
