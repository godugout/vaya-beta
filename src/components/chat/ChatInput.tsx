import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic, MoreHorizontal } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSend: () => void;
  handleMorePrompts: () => void;
  setIsRecording: (value: boolean) => void;
}

const ChatInput = ({
  input,
  setInput,
  handleSend,
  handleMorePrompts,
  setIsRecording,
}: ChatInputProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Input
          placeholder="Share your story..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          className="bg-white border-vaya-chat-border text-vaya-gray-800"
        />
        <Button
          onClick={handleSend}
          className="bg-vaya-primary hover:bg-vaya-primary/90 text-white"
        >
          <Send className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => setIsRecording(true)}
          className="bg-vaya-secondary hover:bg-vaya-secondary/90 text-white"
        >
          <Mic className="h-4 w-4 mr-2" />
          Record
        </Button>
      </div>
      <Button
        onClick={handleMorePrompts}
        variant="ghost"
        className="self-center text-vaya-gray-600 hover:text-vaya-gray-800 hover:bg-vaya-chat-hover"
      >
        <MoreHorizontal className="h-5 w-5 mr-2" />
        More prompts
      </Button>
    </div>
  );
};

export default ChatInput;