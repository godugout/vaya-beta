
import React, { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { HanumanPromptItem } from "@/types/hanuman";
import { useHanumanChat } from "@/hooks/useHanumanChat";
import HanumanBackground from "@/components/hanuman/HanumanBackground";
import HanumanHeader from "@/components/hanuman/HanumanHeader";
import HanumanChatLayout from "@/components/hanuman/HanumanChatLayout";
import { useUserJourney } from "@/contexts/UserJourneyContext";
import { PageTransition } from "@/components/animation/PageTransition";
import { useLocation } from "react-router-dom";

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
  const [activeCategory, setActiveCategory] = React.useState("personal");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = React.useState(false);
  const { selectedPathway } = useUserJourney();
  const location = useLocation();
  
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
    // Set the path in the user journey if it exists
    if (selectedPathway !== "elder-storyteller") {
      // This would be handled by UserJourneyContext but we're setting it here for explicitness
    }
  }, [selectedPathway]);

  const toggleLanguage = () => {
    setLanguagePreference(isSpanish ? 'en' : 'es');
  };

  return (
    <div className="relative min-h-screen">
      <HanumanBackground />
      
      <div className="py-6 md:py-8 relative z-10">
        <div className="w-[90%] mx-auto mb-6">
          <HanumanHeader toggleLanguage={toggleLanguage} />
        </div>
        
        <HanumanChatLayout 
          messages={messages}
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          handlePromptSelect={handlePromptSelect}
          handleMorePrompts={handleMorePrompts}
          activeCategory={activeCategory}
          onCategorySelect={setActiveCategory}
          suggestedPrompts={suggestedPrompts}
          toggleLanguage={toggleLanguage}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          isRightSidebarOpen={isRightSidebarOpen}
          setIsRightSidebarOpen={setIsRightSidebarOpen}
        />
      </div>
    </div>
  );
};

export default HanumanEdition;
