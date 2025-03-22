
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2, Mic, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { motion } from "framer-motion";

interface ChatInputAreaProps {
  input: string;
  setInput: (input: string) => void;
  isLoading: boolean;
  onSubmit: (input: string) => Promise<void>;
  onMorePrompts: () => void;
}

const ChatInputArea: React.FC<ChatInputAreaProps> = ({
  input,
  setInput,
  isLoading,
  onSubmit,
  onMorePrompts,
}) => {
  const { t } = useLanguage();
  const {
    transcript,
    resetTranscript,
    listening,
    startListening,
    stopListening,
    hasRecognitionSupport,
  } = useSpeechRecognition();

  // Speech recognition event handlers
  const handleStartListening = () => {
    startListening();
  };

  const handleStopListening = () => {
    stopListening();
  };

  // Update input with speech recognition transcript
  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript, setInput]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(input);
    resetTranscript();
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="pr-12 border-hanuman-primary/30 focus:border-hanuman-primary focus:ring-hanuman-primary/20"
          placeholder={t("Type your message...")}
        />
        <Button
          type="submit"
          className="absolute right-1 top-1 rounded-full bg-hanuman-primary hover:bg-hanuman-primary/90"
          disabled={isLoading}
        >
          {isLoading ? 
            <Loader2 className="h-4 w-4 animate-spin" /> : 
            <Send className="h-4 w-4" />
          }
        </Button>
      </form>

      {hasRecognitionSupport ? (
        <div className="flex justify-center mt-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              onClick={listening ? handleStopListening : handleStartListening}
              disabled={isLoading}
              className={`border-hanuman-primary/30 hover:bg-hanuman-primary/10 ${
                listening ? 'bg-hanuman-primary/10 text-hanuman-primary' : ''
              }`}
            >
              {listening ? (
                <>
                  {t("Stop Listening")}
                  <Mic className="ml-2 h-4 w-4 text-hanuman-primary animate-pulse" />
                </>
              ) : (
                <>
                  {t("Start Listening")}
                  <Mic className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </motion.div>
        </div>
      ) : (
        <p className="text-center mt-2 text-sm text-gray-500">
          {t("Speech recognition not supported in this browser.")}
        </p>
      )}

      <div className="flex justify-center mt-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="secondary"
            onClick={onMorePrompts}
            className="bg-hanuman-accent/20 text-hanuman-secondary hover:bg-hanuman-accent/30"
          >
            <Sparkles className="mr-2 h-4 w-4 text-hanuman-accent" />
            {t("More Prompts")}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ChatInputArea;
