
import React from "react";
import { Button } from "@/components/ui/button";
import { Menu, Flower } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ChatHeaderProps {
  toggleLanguage: () => void;
  toggleMobileMenu: () => void;
  toggleRightSidebar: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  toggleLanguage, 
  toggleMobileMenu, 
  toggleRightSidebar 
}) => {
  const { isSpanish } = useLanguage();
  
  return (
    <div className="p-4 border-b border-hanuman-saffron/20">
      <div className="flex justify-between items-center">
        <Button 
          variant="ghost" 
          size="icon"
          className="lg:hidden text-hanuman-gold"
          onClick={toggleMobileMenu}
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
            onClick={toggleRightSidebar}
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
  );
};

export default ChatHeader;
