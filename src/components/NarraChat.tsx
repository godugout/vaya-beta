import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle } from "lucide-react";
import VoiceRecorder from "./VoiceRecorder";
import ChatMessage from "./chat/ChatMessage";
import ChatInput from "./chat/ChatInput";
import { useChat } from "./chat/useChat";

const NarraChat = () => {
  const [isRecording, setIsRecording] = useState(false);
  const { messages, input, setInput, handleSend, handleMorePrompts } = useChat();

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white border-vaya-chat-border shadow-lg">
      <CardHeader className="border-b border-vaya-chat-border">
        <CardTitle className="text-vaya-gray-800 flex items-center gap-2">
          <MessageCircle className="h-6 w-6 text-vaya-primary" />
          Chat with Narra
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4 py-4">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
          </div>
        </ScrollArea>

        {isRecording ? (
          <div className="mt-4">
            <VoiceRecorder />
          </div>
        ) : (
          <ChatInput
            input={input}
            setInput={setInput}
            handleSend={handleSend}
            handleMorePrompts={handleMorePrompts}
            setIsRecording={setIsRecording}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default NarraChat;