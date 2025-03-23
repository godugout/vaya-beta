
import React, { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { HanumanPromptItem } from "@/types/hanuman";
import { useHanumanChat } from "@/hooks/useHanumanChat";
import { HanumanTopNav } from "@/components/navigation/HanumanTopNav";
import { FadeIn } from "@/components/animation/FadeIn";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, ChevronRight, BookOpen, Star, Calendar, Sparkles } from "lucide-react";
import HanumanBackground from "@/components/hanuman/HanumanBackground";
import HanumanCategoriesSidebar from "@/components/hanuman/HanumanCategoriesSidebar";
import HanumanChat from "@/components/hanuman/HanumanChat";
import HanumanResourcesSidebar from "@/components/hanuman/HanumanResourcesSidebar";

// Updated suggested prompts with categories
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
  const [activeCategory, setActiveCategory] = useState("personal");
  const [showResources, setShowResources] = useState(true);
  
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

  const toggleLanguage = () => {
    setLanguagePreference(isSpanish ? 'en' : 'es');
  };

  return (
    <div className="relative min-h-screen bg-hanuman-bg">
      <HanumanBackground />
      
      {/* Top navigation */}
      <HanumanTopNav />
      
      <div className="relative z-10 pt-20 pb-12">
        {/* Hero Section */}
        <div className="container mx-auto px-4 mb-8 text-center">
          <FadeIn className="flex flex-col items-center justify-center">
            <div className="inline-flex items-center justify-center bg-hanuman-orange/10 p-3 rounded-full mb-4">
              <Flame className="h-8 w-8 text-hanuman-orange" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-hanuman-gold to-hanuman-saffron hanuman-text-glow">
              {isSpanish ? "Edición Hanuman" : "Hanuman Edition"}
            </h1>
            
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-6">
              {isSpanish 
                ? "Sabiduría ancestral para preservar tus historias familiares" 
                : "Ancient wisdom to preserve your family stories"}
            </p>
            
            <Button 
              onClick={toggleLanguage} 
              variant="outline"
              className="bg-hanuman-gold/10 border-hanuman-gold/20 text-hanuman-gold hover:bg-hanuman-gold/20"
            >
              {isSpanish ? "Switch to English" : "Cambiar a Español"}
            </Button>
          </FadeIn>
        </div>
        
        {/* Main Three-Column Layout */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar - Categories */}
            <div className="lg:col-span-3">
              <HanumanCategoriesSidebar 
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                suggestedPrompts={suggestedPrompts.filter(p => p.category === activeCategory).slice(0, 3)}
                onPromptSelect={handlePromptSelect}
                isSpanish={isSpanish}
              />
            </div>
            
            {/* Middle - Chat Interface */}
            <div className="lg:col-span-6">
              <HanumanChat 
                messages={messages}
                input={input}
                setInput={setInput}
                isLoading={isLoading}
                handleSubmit={handleSubmit}
                handleMorePrompts={handleMorePrompts}
                isSpanish={isSpanish}
              />
            </div>
            
            {/* Right Sidebar - Resources */}
            <div className="lg:col-span-3">
              <HanumanResourcesSidebar isSpanish={isSpanish} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HanumanEdition;
