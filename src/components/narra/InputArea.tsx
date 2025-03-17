
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, SendHorizontal, MoreHorizontal } from "lucide-react";

interface InputAreaProps {
  input: string;
  setInput: (value: string) => void;
  handleSendMessage: () => void;
  startRecording: () => void;
  isRecording: boolean;
  stopRecording: () => void;
  isSpanish: boolean;
}

export const InputArea = ({
  input,
  setInput,
  handleSendMessage,
  startRecording,
  isRecording,
  stopRecording,
  isSpanish,
}: InputAreaProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="border-t p-4">
      <div className="max-w-3xl mx-auto">
        {isRecording ? (
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse"></div>
              <span>{isSpanish ? "Grabando..." : "Recording..."}</span>
            </div>
            <Button variant="ghost" onClick={stopRecording}>
              {isSpanish ? "Detener" : "Stop"}
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Input
              placeholder={
                isSpanish ? "Escribe tu mensaje..." : "Type your message..."
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button
              variant="default"
              className="bg-lovable-blue hover:bg-lovable-teal text-white"
              onClick={handleSendMessage}
            >
              <SendHorizontal className="h-5 w-5" />
            </Button>
            <Button variant="outline" onClick={startRecording}>
              <Mic className="h-5 w-5" />
            </Button>
          </div>
        )}

        <Button
          variant="ghost"
          className="mt-2 text-gray-500 text-sm w-full justify-start"
        >
          <MoreHorizontal className="h-4 w-4 mr-1" />
          {isSpanish ? "Más sugerencias" : "More suggestions"}
        </Button>
      </div>
    </div>
  );
};
