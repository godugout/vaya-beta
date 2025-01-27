import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import VoiceRecorder from "./VoiceRecorder";
import ChatMessage from "./chat/ChatMessage";
import ChatInput from "./chat/ChatInput";
import { useChat } from "./chat/useChat";

const NarraChat = () => {
  const [isRecording, setIsRecording] = useState(false);
  const { messages, input, setInput, handleSend, handleMorePrompts } = useChat();

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-white">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b border-vaya-chat-border bg-white">
        <MessageCircle className="h-6 w-6 text-vaya-primary" />
        <h1 className="text-lg font-semibold text-vaya-gray-800">Chat with Narra</h1>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-2xl mx-auto">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
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
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NarraChat;