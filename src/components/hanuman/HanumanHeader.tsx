
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { FlexBox } from "@/components/ui/grid-layout";
import { Button } from "@/components/ui/button";
import { Flame } from "lucide-react";

interface HanumanHeaderProps {
  toggleLanguage: () => void;
}

const HanumanHeader: React.FC<HanumanHeaderProps> = ({ toggleLanguage }) => {
  const { isSpanish } = useLanguage();
  
  return (
    <FlexBox align="center" justify="center" direction="column" className="mb-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <div className="bg-hanuman-primary/10 p-2.5 rounded-full">
            <Flame className="h-5 w-5 text-hanuman-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-hanuman-gold to-hanuman-saffron hanuman-text-glow">
            {isSpanish ? "Edición Hanuman" : "Hanuman Edition"}
          </h1>
        </div>
        <p className="text-white/80 mt-2 max-w-2xl mx-auto">
          {isSpanish 
            ? "Sabiduría ancestral para preservar tus historias familiares" 
            : "Ancient wisdom to preserve your family stories"}
        </p>
      </div>
      
      <div className="mt-4">
        <Button 
          variant="outline"
          size="sm"
          onClick={toggleLanguage}
          className="bg-hanuman-bg-dark/40 border-hanuman-primary/20 text-hanuman-text-secondary hover:bg-hanuman-primary/10"
        >
          {isSpanish ? "Switch to English" : "Cambiar a Español"}
        </Button>
      </div>
    </FlexBox>
  );
};

export default HanumanHeader;
