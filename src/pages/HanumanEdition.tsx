import React, { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { HanumanPromptItem } from "@/types/hanuman";
import SuggestedPrompts from "@/components/narra/SuggestedPrompts";
import { useHanumanChat } from "@/hooks/useHanumanChat";
import ChatMessages from "@/components/hanuman/ChatMessages";
import ChatInputArea from "@/components/hanuman/ChatInputArea";
import HanumanSidebar from "@/components/hanuman/HanumanSidebar";
import HanumanResources from "@/components/hanuman/HanumanResources";
import { motion } from "framer-motion";
import { Flame, Flower, Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  {
    id: "prompt-6",
    content: "How has your spiritual journey shaped your life?",
    category: "sacred"
  },
  {
    id: "prompt-7",
    content: "What historical events had the biggest impact on your family?",
    category: "history"
  },
  {
    id: "prompt-8",
    content: "What values do you hope to pass on to future generations?",
    category: "wisdom"
  },
];

const HanumanEdition = () => {
  const { isSpanish, setLanguagePreference } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [activeCategory, setActiveCategory] = useState("personal");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const {
    messages,
    input,
    setInput,
    isLoading,
    handleSubmit,
    handlePromptSelect,
    handleMorePrompts
  } = useHanumanChat();

  useEffect(() => {
    document.body.classList.add('hanuman-theme');
    return () => {
      document.body.classList.remove('hanuman-theme');
    };
  }, []);

  const filteredPrompts = suggestedPrompts.filter(
    prompt => prompt.category === activeCategory
  );

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setLanguagePreference(isSpanish ? 'en' : 'es');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-screen bg-gradient-to-b from-hanuman-bg-light to-white dark:from-hanuman-bg-dark dark:to-gray-900"
    >
      <div className="backdrop-pattern"></div>
      
      <header className="py-4 px-6 md:px-10 relative border-b border-hanuman-primary/10 backdrop-blur-md bg-white/60 dark:bg-gray-900/60">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu />
            </Button>
            
            <div className="hidden md:flex items-center gap-3">
              <div className="h-12 w-12 bg-hanuman-primary/10 rounded-full flex items-center justify-center">
                <Flower className="text-hanuman-primary h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">
                  {isSpanish ? "Edición Hanuman" : "Hanuman Edition"}
                </h1>
                <p className="text-xs text-hanuman-secondary">
                  {isSpanish ? "Sabiduría ancestral" : "Ancient wisdom"}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleLanguage}
              className="rounded-full"
            >
              <span className="font-medium text-sm">{isSpanish ? "EN" : "ES"}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="rounded-full text-hanuman-primary"
            >
              {theme === 'light' ? <Moon /> : <Sun />}
            </Button>
            
            <Avatar className="h-8 w-8">
              <AvatarImage src="/assets/hanuman-avatar.png" alt="User avatar" />
              <AvatarFallback className="bg-hanuman-purple text-white">U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6 md:px-10 md:py-8">
        <div className="three-column-layout">
          <div className="left-column">
            <HanumanSidebar 
              onCategorySelect={setActiveCategory} 
              activeCategory={activeCategory} 
            />
          </div>
          
          <div className="chat-column">
            <div className="chat-container">
              <div className="chat-header">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-medium hanuman-decorative-border inline-block pb-1">
                      {isSpanish ? "Conversación Sagrada" : "Sacred Conversation"}
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      {isSpanish 
                        ? "Preserva tus memorias familiares para las futuras generaciones" 
                        : "Preserve your family memories for future generations"}
                    </p>
                  </div>
                  <div className="sacred-border text-xs font-medium">
                    {activeCategory === "personal" && (isSpanish ? "Personal" : "Personal")}
                    {activeCategory === "family" && (isSpanish ? "Familia" : "Family")}
                    {activeCategory === "wisdom" && (isSpanish ? "Sabiduría" : "Wisdom")}
                    {activeCategory === "history" && (isSpanish ? "Historia" : "History")}
                    {activeCategory === "sacred" && (isSpanish ? "Sagrado" : "Sacred")}
                  </div>
                </div>
                
                <div className="mt-4">
                  <SuggestedPrompts 
                    prompts={filteredPrompts} 
                    onSelect={handlePromptSelect} 
                    isSpanish={isSpanish} 
                  />
                </div>
              </div>
              
              <ChatMessages messages={messages} isLoading={isLoading} />
              
              <ChatInputArea
                input={input}
                setInput={setInput}
                isLoading={isLoading}
                onSubmit={handleSubmit}
                onMorePrompts={handleMorePrompts}
              />
            </div>
          </div>
          
          <div className="right-column">
            <HanumanResources />
          </div>
        </div>
      </main>

      <footer className="py-4 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-hanuman-primary/10">
        <p>
          {isSpanish 
            ? "Inspirado por las enseñanzas y la sabiduría de Hanuman" 
            : "Inspired by the teachings and wisdom of Hanuman"}
        </p>
      </footer>
      
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-3/4 max-w-xs h-full bg-white dark:bg-gray-900 p-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
              <div className="h-10 w-10 bg-hanuman-primary/10 rounded-full flex items-center justify-center">
                <Flower className="text-hanuman-primary h-5 w-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold">
                  {isSpanish ? "Edición Hanuman" : "Hanuman Edition"}
                </h1>
                <p className="text-xs text-hanuman-secondary">
                  {isSpanish ? "Sabiduría ancestral" : "Ancient wisdom"}
                </p>
              </div>
            </div>
            
            <HanumanSidebar 
              onCategorySelect={(category) => {
                setActiveCategory(category);
                setIsMobileMenuOpen(false);
              }} 
              activeCategory={activeCategory} 
            />
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default HanumanEdition;
