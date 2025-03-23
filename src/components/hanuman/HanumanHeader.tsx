
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface HanumanHeaderProps {
  toggleLanguage: () => void;
}

const HanumanHeader: React.FC<HanumanHeaderProps> = ({ toggleLanguage }) => {
  const { isSpanish } = useLanguage();
  
  return (
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
  );
};

export default HanumanHeader;
