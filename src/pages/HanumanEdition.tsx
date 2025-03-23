
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
import { Container, Grid, GridItem } from "@/components/ui/grid-layout";

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
      
      <Container maxWidth="2xl" className="py-6 md:py-12 relative z-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-hanuman-gold to-hanuman-saffron">
            {isSpanish ? "Edición Hanuman" : "Hanuman Edition"}
          </h1>
          <p className="text-white/80 mt-2 max-w-2xl mx-auto">
            {isSpanish 
              ? "Sabiduría ancestral para preservar tus historias familiares" 
              : "Ancient wisdom to preserve your family stories"}
          </p>
        </div>
        
        <Grid cols={12} gap={6} className="min-h-[70vh]">
          <GridItem colSpan={isMobile ? 12 : isTablet ? 4 : 3} className={isMobileMenuOpen || !isMobile ? 'block' : 'hidden'}>
            <Card className="h-full bg-black/30 backdrop-blur-md border-none shadow-xl shadow-hanuman-saffron/5 overflow-hidden">
              <div className="h-full p-4">
                <HanumanSidebar 
                  onCategorySelect={(category) => {
                    setActiveCategory(category);
                    if (isMobile) setIsMobileMenuOpen(false);
                  }} 
                  activeCategory={activeCategory} 
                />
              </div>
            </Card>
          </GridItem>
          
          <GridItem colSpan={isMobile ? 12 : isTablet ? 6 : 6} className="flex flex-col">
            <Card className="h-full bg-black/30 backdrop-blur-md border-none shadow-xl shadow-hanuman-gold/5 flex flex-col overflow-hidden">
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
                  
                  <h2 className="text-xl font-medium text-hanuman-gold flex items-center">
                    <span className="hidden sm:inline">{isSpanish ? "Conversación Sagrada" : "Sacred Conversation"}</span>
                    <span className="sm:hidden">{isSpanish ? "Chat" : "Chat"}</span>
                  </h2>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="md:hidden text-hanuman-gold"
                      onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
                    >
                      <Flower className="h-5 w-5" />
                    </Button>
                    
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
          </GridItem>
          
          <GridItem colSpan={isMobile ? 12 : isTablet ? 2 : 3} className={`${(isDesktop || isRightSidebarOpen) ? 'block' : 'hidden'}`}>
            <Card className="h-full bg-black/30 backdrop-blur-md border-none shadow-xl shadow-hanuman-gold/5 overflow-hidden">
              <div className="h-full p-4">
                <HanumanResources />
              </div>
            </Card>
          </GridItem>
        </Grid>
      </Container>
    </div>
  );
};

export default HanumanEdition;
