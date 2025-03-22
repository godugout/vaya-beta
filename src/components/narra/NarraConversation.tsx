
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessagesSquare, Sparkles } from "lucide-react";
import { NarraHeader } from "./NarraHeader";
import { ConversationView } from "./ConversationView";
import { InputArea } from "./InputArea";
import SuggestedPrompts from "./SuggestedPrompts";
import { useNarraConversation } from "./hooks/useNarraConversation";
import { NarraConversationProps } from "./types";

export const NarraConversation = ({ initialMessages = [] }: NarraConversationProps) => {
  const [isSpanish, setIsSpanish] = useState(false);
  
  const {
    messages,
    input,
    setInput,
    isRecording,
    isProcessing,
    handleSendMessage,
    startRecording,
    stopRecording,
    handleSuggestedPrompt
  } = useNarraConversation(initialMessages);

  const toggleLanguage = () => {
    setIsSpanish(!isSpanish);
  };

  return (
    <div className="flex flex-col h-full">
      <NarraHeader isSpanish={isSpanish} toggleLanguage={toggleLanguage} />
      
      <Tabs defaultValue="chat" className="flex-1 flex flex-col">
        <div className="border-b px-4 py-2">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="chat">
              <MessagesSquare className="h-4 w-4 mr-2" />
              {isSpanish ? "Conversación" : "Conversation"}
            </TabsTrigger>
            <TabsTrigger value="prompts">
              <Sparkles className="h-4 w-4 mr-2" />
              {isSpanish ? "Ideas" : "Prompts"}
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="chat" className="flex-1 flex flex-col m-0 pt-4">
          <ConversationView 
            messages={messages} 
            isProcessing={isProcessing} 
          />
          
          <InputArea 
            input={input}
            setInput={setInput}
            handleSendMessage={handleSendMessage}
            startRecording={startRecording}
            isRecording={isRecording}
            stopRecording={stopRecording}
            isSpanish={isSpanish}
          />
        </TabsContent>
        
        <TabsContent value="prompts" className="flex-1 m-0 overflow-auto p-4">
          <SuggestedPrompts 
            isSpanish={isSpanish} 
            onPromptSelect={handleSuggestedPrompt} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
