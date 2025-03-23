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
import { Flower, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useBreakpoints } from "@/hooks/use-media-query";
import { Card } from "@/components/ui/card";

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
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState("personal");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const { isMobile, isTablet, isDesktop } = useBreakpoints();
  
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

  const toggleLanguage = () => {
    setLanguagePreference(isSpanish ? 'en' : 'es');
  };

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 z-0">
        <div className="w-full h-full overflow-hidden relative">
          <img 
            src="/lovable-uploads/dbfde90d-4253-4295-b1e9-e9bb049cd9cd.png" 
            alt="Hanuman background" 
            className="w-full h-full object-cover opacity-30 md:object-cover md:object-top scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-hanuman-primary/20 via-hanuman-cosmic-blue/15 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-hanuman-saffron/20 via-transparent to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-hanuman-saffron/30 to-transparent"></div>
          <div className="absolute left-0 top-0 w-1/4 h-full bg-gradient-to-r from-hanuman-saffron/30 to-transparent"></div>
          <div className="absolute right-0 top-0 w-1/4 h-full bg-gradient-to-l from-hanuman-saffron/30 to-transparent"></div>
          <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-hanuman-cosmic-purple/40 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-hanuman-saffron/30 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-hanuman-saffron/30 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-hanuman-cosmic-blue/30 to-transparent rounded-full blur-3xl"></div>
        </div>
      </div>
      
      <div className="container mx-auto py-6 md:py-12 px-4 relative z-10">
        <div className="backdrop-blur-sm bg-gradient-to-br from-hanuman-orange/20 via-hanuman-saffron/10 to-hanuman-cosmic-blue/15 rounded-3xl shadow-[0_0_40px_rgba(255,126,0,0.15)] p-4 md:p-8 overflow-hidden border-none">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-hanuman-orange/10 blur-3xl rounded-full transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-hanuman-cosmic-blue/10 blur-3xl rounded-full transform -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-hanuman-gold/10 blur-3xl rounded-full pointer-events-none"></div>
          
          <h1 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-hanuman-gold to-hanuman-saffron relative z-10">
            {isSpanish ? "Edición Hanuman" : "Hanuman Edition"}
          </h1>
          <p className="text-white/80 text-center mb-8 max-w-xl mx-auto">
            {isSpanish 
              ? "Sabiduría ancestral para preservar tus historias familiares" 
              : "Ancient wisdom to preserve your family stories"}
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className={`lg:col-span-3 ${isMobileMenuOpen || !isMobile ? 'block' : 'hidden'}`}>
              <Card className="bg-black/40 backdrop-blur-md border-hanuman-saffron/20 p-4">
                <HanumanSidebar 
                  onCategorySelect={(category) => {
                    setActiveCategory(category);
                    if (isMobile) setIsMobileMenuOpen(false);
                  }} 
                  activeCategory={activeCategory} 
                />
              </Card>
            </div>
            
            <div className="lg:col-span-6 flex flex-col">
              <Card className="bg-black/40 backdrop-blur-md border-hanuman-saffron/20 flex-1 flex flex-col overflow-hidden">
                <div className="p-4 border-b border-hanuman-saffron/20">
                  <div className="flex justify-between items-center">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="lg:hidden text-hanuman-gold"
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                      <Menu className="h-5 w-5" />
                    </Button>
                    
                    <h2 className="text-xl font-medium text-hanuman-gold">
                      {isSpanish ? "Conversación Sagrada" : "Sacred Conversation"}
                    </h2>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={toggleLanguage}
                      className="text-hanuman-gold"
                    >
                      {isSpanish ? "EN" : "ES"}
                    </Button>
                  </div>
                </div>
                
                <ChatMessages messages={messages} isLoading={isLoading} />
                
                <div className="mt-auto p-4 border-t border-hanuman-saffron/20">
                  <SuggestedPrompts 
                    prompts={filteredPrompts.slice(0, 3)} 
                    onSelect={handlePromptSelect} 
                    isSpanish={isSpanish} 
                  />
                  
                  <ChatInputArea
                    input={input}
                    setInput={setInput}
                    isLoading={isLoading}
                    onSubmit={handleSubmit}
                    onMorePrompts={handleMorePrompts}
                  />
                </div>
              </Card>
            </div>
            
            <div className={`lg:col-span-3 ${(isDesktop || isRightSidebarOpen) ? 'block' : 'hidden'}`}>
              <Card className="bg-black/40 backdrop-blur-md border-hanuman-saffron/20 p-4">
                <HanumanResources />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HanumanEdition;
