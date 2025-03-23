
import React, { useState, useRef, useEffect } from "react";
import { HanumanMessage } from "@/types/hanuman";
import { motion, AnimatePresence } from "framer-motion";
import ChatMessages from "@/components/hanuman/ChatMessages";
import StoryBar from "@/components/hanuman/StoryBar";
import useHanumanChat from "@/hooks/useHanumanChat";

interface EnhancedHanumanChatProps {
  activeCategory: string;
}

export const EnhancedHanumanChat: React.FC<EnhancedHanumanChatProps> = ({ activeCategory }) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  
  // Use our hook for chat functionality
  const {
    messages,
    input,
    setInput,
    isLoading,
    handleSubmit,
    handlePromptSelect
  } = useHanumanChat();

  // Effect to scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Effect to update suggestions when category changes
  useEffect(() => {
    // Add a "category change" message when the user switches categories
    if (messages.length > 0 && activeCategory) {
      const categoryName = activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1);
      const newAssistantMessage: HanumanMessage = { 
        role: "assistant", 
        content: `Now exploring: ${categoryName}. You can ask me anything about this topic or try one of the suggested prompts below.` 
      };
      // Use the hook's method to update messages
      handlePromptSelect(`Tell me about ${activeCategory}`);
    }
  }, [activeCategory]);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    // Simulate recording end and transcription after 3 seconds
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setInput("This is a simulated transcription from your voice recording.");
      }, 3000);
    }
  };

  return (
    <div className="relative h-[75vh] flex flex-col backdrop-blur-sm bg-gradient-to-br from-amber-900/20 via-amber-800/10 to-green-900/15 rounded-3xl shadow-[0_0_40px_rgba(255,126,0,0.15)] border-none">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-hanuman-primary/10 blur-3xl rounded-full transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-hanuman-green/10 blur-3xl rounded-full transform -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
      
      {/* Chat header with subtle shine effect */}
      <div className="p-4 border-b border-hanuman-orange/20 bg-gradient-to-r from-black/40 via-hanuman-orange/10 to-black/40 relative z-10">
        <h2 className="text-lg font-semibold text-hanuman-gold flex items-center">
          <span className="mr-2">🕉️</span> 
          Family Stories Explorer
        </h2>
        <p className="text-sm text-white/70">
          Share and discover your family's unique journey through time
        </p>
      </div>
      
      {/* Chat message area */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10">
        <ChatMessages messages={messages} isLoading={isLoading} />
      </div>
      
      {/* Story Bar (Footer) */}
      <StoryBar
        input={input}
        setInput={setInput}
        onSendMessage={handleSubmit}
        onPromptSelect={handlePromptSelect}
        activeCategory={activeCategory}
        isRecording={isRecording}
        toggleRecording={toggleRecording}
        isLoading={isLoading}
      />
    </div>
  );
};
