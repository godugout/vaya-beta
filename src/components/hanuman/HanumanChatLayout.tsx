
import React from "react";
import { Card } from "@/components/ui/card";
import { Grid, GridItem, FlexBox } from "@/components/ui/grid-layout";
import HanumanSidebar from "@/components/hanuman/HanumanSidebar";
import HanumanResources from "@/components/hanuman/HanumanResources";
import ChatHeader from "@/components/hanuman/ChatHeader";
import ChatMessages from "@/components/hanuman/ChatMessages";
import ChatInputArea from "@/components/hanuman/ChatInputArea";
import SuggestedPrompts from "@/components/narra/SuggestedPrompts";
import { HanumanPromptItem } from "@/types/hanuman";
import { useBreakpoints } from "@/hooks/use-media-query";

interface HanumanChatLayoutProps {
  messages: any[];
  input: string;
  setInput: (input: string) => void;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  handlePromptSelect: (prompt: string) => void;
  handleMorePrompts: () => void;
  activeCategory: string;
  onCategorySelect: (category: string) => void;
  suggestedPrompts: HanumanPromptItem[];
  toggleLanguage: () => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  isRightSidebarOpen: boolean;
  setIsRightSidebarOpen: (isOpen: boolean) => void;
}

const HanumanChatLayout: React.FC<HanumanChatLayoutProps> = ({
  messages,
  input,
  setInput,
  isLoading,
  handleSubmit,
  handlePromptSelect,
  handleMorePrompts,
  activeCategory,
  onCategorySelect,
  suggestedPrompts,
  toggleLanguage,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  isRightSidebarOpen,
  setIsRightSidebarOpen
}) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoints();
  
  const filteredPrompts = suggestedPrompts.filter(
    prompt => prompt.category === activeCategory
  );
  
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleRightSidebar = () => setIsRightSidebarOpen(!isRightSidebarOpen);
  
  return (
    <div className="container mx-auto px-4 md:px-6">
      <Grid cols={12} gap={4} className="min-h-[calc(100vh-120px)]">
        {/* Left sidebar - Story categories and prompts */}
        <GridItem 
          colSpan={isMobile ? 12 : isTablet ? 4 : 3} 
          className={isMobileMenuOpen || !isMobile ? 'block' : 'hidden'}
        >
          <FlexBox direction="column" className="h-full gap-4">
            {/* Categories */}
            <Card className="bg-black/30 backdrop-blur-md border-none shadow-xl shadow-hanuman-saffron/5 overflow-hidden flex-1">
              <div className="h-full p-3">
                <HanumanSidebar 
                  onCategorySelect={(category) => {
                    onCategorySelect(category);
                    if (isMobile) setIsMobileMenuOpen(false);
                  }} 
                  activeCategory={activeCategory} 
                />
              </div>
            </Card>
            
            {/* Suggested Prompts */}
            <Card className="bg-black/30 backdrop-blur-md border-none shadow-xl shadow-hanuman-saffron/5 overflow-hidden">
              <div className="p-3">
                <SuggestedPrompts 
                  prompts={filteredPrompts.slice(0, 3)} 
                  onSelect={handlePromptSelect} 
                />
              </div>
            </Card>
          </FlexBox>
        </GridItem>
        
        {/* Center content - Chat interface */}
        <GridItem 
          colSpan={isMobile ? 12 : isTablet ? 8 : 6} 
          className="flex flex-col"
        >
          <Card className="h-full bg-black/30 backdrop-blur-md border-none shadow-xl shadow-hanuman-gold/5 flex flex-col overflow-hidden">
            <ChatHeader 
              toggleLanguage={toggleLanguage}
              toggleMobileMenu={toggleMobileMenu}
              toggleRightSidebar={toggleRightSidebar}
            />
            
            <ChatMessages messages={messages} isLoading={isLoading} />
            
            <div className="mt-auto border-t border-hanuman-saffron/20">
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
        
        {/* Right sidebar - Resources and contextual info */}
        <GridItem 
          colSpan={isMobile ? 12 : 3} 
          className={`${(isDesktop || isRightSidebarOpen) ? 'block' : 'hidden'}`}
        >
          <Card className="h-full bg-black/30 backdrop-blur-md border-none shadow-xl shadow-hanuman-gold/5 overflow-hidden">
            <div className="h-full p-3">
              <HanumanResources />
            </div>
          </Card>
        </GridItem>
      </Grid>
    </div>
  );
};

export default HanumanChatLayout;
