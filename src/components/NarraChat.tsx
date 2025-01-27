import { useState } from "react";
import { MessageCircle, Languages } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import VoiceRecorder from "./VoiceRecorder";
import ChatMessage from "./chat/ChatMessage";
import ChatInput from "./chat/ChatInput";
import { useChat } from "./chat/useChat";

const NarraChat = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isSpanish, setIsSpanish] = useState(false);
  const { messages, input, setInput, handleSend, handleMorePrompts } = useChat();

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-vaya-chat-border bg-white">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-6 w-6 text-vaya-primary" />
          <h1 className="text-lg font-semibold text-vaya-gray-800">Chat with Narra</h1>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsSpanish(!isSpanish)}
          className="text-vaya-gray-600 hover:text-vaya-gray-800"
        >
          <Languages className="h-4 w-4 mr-2" />
          {isSpanish ? "English" : "Español"}
        </Button>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-2xl mx-auto">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} isSpanish={isSpanish} />
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-vaya-chat-border bg-white p-4">
        <div className="max-w-2xl mx-auto">
          {isRecording ? (
            <VoiceRecorder />
          ) : (
            <ChatInput
              input={input}
              setInput={setInput}
              handleSend={handleSend}
              handleMorePrompts={handleMorePrompts}
              setIsRecording={setIsRecording}
              isSpanish={isSpanish}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NarraChat;