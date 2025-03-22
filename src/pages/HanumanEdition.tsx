
import React, { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { HanumanPromptItem } from "@/types/hanuman";
import SuggestedPrompts from "@/components/narra/SuggestedPrompts";
import { useHanumanChat } from "@/hooks/useHanumanChat";
import ChatMessages from "@/components/hanuman/ChatMessages";
import ChatInputArea from "@/components/hanuman/ChatInputArea";
import { motion } from "framer-motion";
import { Flame, Sun, FlowerLotus } from "lucide-react";

// Enhanced suggested prompts with categories
const suggestedPrompts: HanumanPromptItem[] = [
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

  // Apply Hanuman theme when component mounts
  useEffect(() => {
    document.body.classList.add('hanuman-theme');
    return () => {
      document.body.classList.remove('hanuman-theme');
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-screen bg-gradient-to-b from-hanuman-bg-light to-white dark:from-hanuman-bg-dark dark:to-gray-900"
    >
      {/* Header with decorative elements */}
      <header className="text-center py-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 transform -translate-x-1/2">
            <Sun className="text-hanuman-accent w-32 h-32" />
          </div>
          <div className="absolute top-0 right-1/4 transform translate-x-1/2">
            <FlowerLotus className="text-hanuman-primary w-32 h-32" />
          </div>
        </div>

        <motion.h1 
          className="text-3xl md:text-4xl font-bold text-hanuman-primary relative z-10"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        >
          {isSpanish ? "Edición Hanuman" : "Hanuman Edition"}
        </motion.h1>
        <motion.p 
          className="text-hanuman-secondary mt-2 max-w-2xl mx-auto"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {isSpanish 
            ? "Conversaciones sagradas para preservar la historia de tu familia" 
            : "Sacred conversations to preserve your family's history"}
        </motion.p>
      </header>

      {/* Main content area */}
      <main className="flex-grow container mx-auto max-w-4xl px-4 pb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-hanuman-primary/20">
          <div className="chat-container h-[600px] flex flex-col">
            {/* Chat messages area */}
            <ChatMessages messages={messages} isLoading={isLoading} />
            
            {/* Suggested prompts */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
              <SuggestedPrompts 
                prompts={suggestedPrompts} 
                onSelect={handlePromptSelect} 
                isSpanish={isSpanish} 
              />
            </div>
            
            {/* Chat input area */}
            <ChatInputArea
              input={input}
              setInput={setInput}
              isLoading={isLoading}
              onSubmit={handleSubmit}
              onMorePrompts={handleMorePrompts}
            />
          </div>
        </div>
      </main>

      {/* Footer with attribution */}
      <footer className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          {isSpanish 
            ? "Inspirado por las enseñanzas y la sabiduría de Hanuman" 
            : "Inspired by the teachings and wisdom of Hanuman"}
        </p>
      </footer>
    </motion.div>
  );
};

export default HanumanEdition;
