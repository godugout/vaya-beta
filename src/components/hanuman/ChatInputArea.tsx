
import React, { useState, FormEvent } from "react";
import { Send, Mic, Sparkles, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface ChatInputAreaProps {
  input: string;
  setInput: (input: string) => void;
  isLoading: boolean;
  onSubmit: (e: FormEvent) => void;
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
        onSubmit(e as unknown as FormEvent);
      }
    }
  };

  return (
    <div className="chat-footer p-4 bg-gradient-to-b from-amber-900/20 via-amber-800/10 to-green-900/15 backdrop-blur-md border-t border-hanuman-primary/10">
      <form onSubmit={onSubmit} className="space-y-2 max-w-4xl mx-auto">
        <div className="relative">
          <Textarea
            placeholder={isSpanish ? "Escribe tu mensaje..." : "Type your message..."}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            className="input-hanuman resize-none pr-24 min-h-[80px] md:min-h-[60px] bg-black/30 border-hanuman-orange/30 focus:border-hanuman-gold/50 placeholder:text-white/50 text-white"
            rows={2}
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
              className="rounded-full h-9 w-9 bg-hanuman-primary/20 hover:bg-hanuman-primary/30 dark:bg-gray-800 dark:hover:bg-gray-700"
              onClick={() => setIsRecording(!isRecording)}
              disabled={isLoading}
            >
              <Mic size={18} className={isRecording ? "text-hanuman-primary" : "text-hanuman-gold"} />
            </Button>
            
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="rounded-full h-9 w-9 bg-hanuman-primary/20 hover:bg-hanuman-primary/30 dark:bg-gray-800 dark:hover:bg-gray-700"
              disabled={isLoading}
            >
              <Image size={18} className="text-hanuman-gold" />
            </Button>
            
            <Button
              type="submit"
              size="icon"
              className="rounded-full h-9 w-9 bg-gradient-to-r from-hanuman-primary to-hanuman-saffron hover:from-hanuman-primary/90 hover:to-hanuman-saffron/90 text-white"
              disabled={isLoading || !input.trim()}
            >
              <Send size={18} />
            </Button>
          </motion.div>
        </div>
        
        <div className="flex justify-between items-center text-xs text-gray-500">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-xs flex items-center gap-1 text-hanuman-gold/70 hover:text-hanuman-gold"
            onClick={onMorePrompts}
          >
            <Sparkles size={14} />
            <span>{isSpanish ? "Más ideas" : "More ideas"}</span>
          </Button>
          
          <div className="text-xs text-hanuman-gold/70">
            {isSpanish ? "Hanuman Edition" : "Hanuman Edition"}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInputArea;
