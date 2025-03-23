
import React, { useState } from "react";
import { Send, Mic, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface ChatInputAreaProps {
  input: string;
  setInput: (input: string) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onMorePrompts: () => void;
}

const ChatInputArea: React.FC<ChatInputAreaProps> = ({
  input,
  setInput,
  isLoading,
  onSubmit,
  onMorePrompts
}) => {
  const { isSpanish } = useLanguage();
  const [isRecording, setIsRecording] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && input.trim()) {
        onSubmit(e as unknown as React.FormEvent);
      }
    }
  };

  return (
    <div className="chat-footer">
      <form onSubmit={onSubmit} className="space-y-3">
        <div className="relative">
          <Textarea
            placeholder={isSpanish ? "Escribe tu mensaje..." : "Type your message..."}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            className="input-hanuman resize-none pr-20"
            rows={3}
            disabled={isLoading}
          />
          
          <motion.div 
            className="absolute bottom-3 right-3 flex gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="rounded-full h-8 w-8 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              onClick={() => setIsRecording(!isRecording)}
              disabled={isLoading}
            >
              <Mic size={16} className={isRecording ? "text-hanuman-primary" : ""} />
            </Button>
            
            <Button
              type="submit"
              size="icon"
              className="rounded-full h-8 w-8 bg-hanuman-primary hover:bg-hanuman-primary/90 text-white"
              disabled={isLoading || !input.trim()}
            >
              <Send size={16} />
            </Button>
          </motion.div>
        </div>
        
        <div className="flex justify-between items-center">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-xs flex items-center gap-1 text-gray-500 hover:text-hanuman-primary"
            onClick={onMorePrompts}
          >
            <Sparkles size={14} />
            <span>{isSpanish ? "Más ideas" : "More ideas"}</span>
          </Button>
          
          <div className="text-xs text-gray-500">
            {isSpanish ? "Powered by Hanuman Edition" : "Powered by Hanuman Edition"}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInputArea;
