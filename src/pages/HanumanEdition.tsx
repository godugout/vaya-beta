
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PromptItem } from "@/components/chat/hooks/types";
import SuggestedPrompts from "@/components/narra/SuggestedPrompts";
import { useHanumanChat } from "@/hooks/useHanumanChat";
import ChatMessages from "@/components/hanuman/ChatMessages";
import ChatInputArea from "@/components/hanuman/ChatInputArea";

// Add category to each prompt item to match the PromptItem type
const suggestedPrompts: PromptItem[] = [
  {
    id: "prompt-1",
    content: "Tell me about your childhood.",
    category: "personal"
  },
  {
    id: "prompt-2",
    content: "What are some of your favorite family traditions?",
    category: "family"
  },
  {
    id: "prompt-3",
    content: "What is your favorite memory?",
    category: "personal"
  },
  {
    id: "prompt-4",
    content: "Tell me about a time you overcame a challenge.",
    category: "personal"
  },
  {
    id: "prompt-5",
    content: "What are some of the most important lessons you've learned in life?",
    category: "wisdom"
  },
];

const HanumanEdition = () => {
  const { isSpanish } = useLanguage();
  const {
    messages,
    input,
    setInput,
    isLoading,
    handleSubmit,
    handlePromptSelect,
    handleMorePrompts
  } = useHanumanChat();

  return (
    <div className="flex flex-col h-screen">
      <ChatMessages messages={messages} isLoading={isLoading} />
      
      <SuggestedPrompts prompts={suggestedPrompts} onSelect={handlePromptSelect} isSpanish={isSpanish} />
      
      <ChatInputArea
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        onSubmit={handleSubmit}
        onMorePrompts={handleMorePrompts}
      />
    </div>
  );
};

export default HanumanEdition;
