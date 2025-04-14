
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mic, StopCircle, Paperclip, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EnhancedRecordingButton } from "@/components/voice-recording/EnhancedRecordingButton";

interface StoryBarProps {
  input: string;
  setInput: (input: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
  onPromptSelect: (prompt: string) => void;
  activeCategory: string;
  isRecording: boolean;
  toggleRecording: () => void;
  isLoading: boolean;
}

const StoryBar: React.FC<StoryBarProps> = ({
  input,
  setInput,
  onSendMessage,
  onPromptSelect,
  activeCategory,
  isRecording,
  toggleRecording,
  isLoading
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <button
        type="button"
        className="p-2.5 rounded-full bg-gradient-to-r from-hanuman-cosmic-purple/80 to-hanuman-cosmic-blue/80 hover:from-hanuman-cosmic-purple hover:to-hanuman-cosmic-blue transition-all duration-300 text-white"
        onClick={toggleRecording}
        disabled={isLoading}
      >
        {isRecording ? <StopCircle className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
      </button>
      
      <button
        type="button"
        className="p-2.5 rounded-full bg-gradient-to-r from-hanuman-green/80 to-hanuman-green/60 hover:from-hanuman-green hover:to-hanuman-green/80 transition-all duration-300 text-white"
      >
        <Paperclip className="h-5 w-5" />
      </button>
      
      <div className="relative flex-1">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Share your story or ask about your family history..."
          className="w-full py-6 px-4 bg-black/30 border border-hanuman-orange/30 focus:border-hanuman-gold/50 placeholder:text-white/50 text-white rounded-xl"
          disabled={isLoading}
        />
        {input.length === 0 && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-hanuman-gold transition-colors p-1.5"
            onClick={() => onPromptSelect("Tell me about your family heritage")}
          >
            <Sparkles className="h-4 w-4" />
          </button>
        )}
      </div>
      
      <button 
        type="submit"
        className="p-2.5 rounded-full bg-gradient-to-r from-hanuman-primary/80 to-hanuman-saffron/80 hover:from-hanuman-primary hover:to-hanuman-saffron transition-all duration-300 text-white"
        disabled={!input.trim() || isLoading}
      >
        <Send className="h-5 w-5" />
      </button>
    </form>
  );
};

export default StoryBar;
