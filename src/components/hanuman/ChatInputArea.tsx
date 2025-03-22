
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2, Mic } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

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
    <div className="p-4">
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="pr-12"
          placeholder={t("Type your message...")}
        />
        <Button
          type="submit"
          className="absolute right-1 top-1 rounded-full"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>

      {hasRecognitionSupport ? (
        <div className="flex justify-center mt-2">
          <Button
            variant="outline"
            onClick={listening ? handleStopListening : handleStartListening}
            disabled={isLoading}
          >
            {listening ? (
              <>
                {t("Stop Listening")}
                <Mic className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                {t("Start Listening")}
                <Mic className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      ) : (
        <p className="text-center mt-2">
          {t("Speech recognition not supported in this browser.")}
        </p>
      )}

      <div className="flex justify-center mt-4">
        <Button
          variant="secondary"
          onClick={onMorePrompts}
        >
          {t("More Prompts")}
        </Button>
      </div>
    </div>
  );
};

export default ChatInputArea;
