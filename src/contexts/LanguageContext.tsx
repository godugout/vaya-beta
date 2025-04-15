
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";

type LanguageContextType = {
  isSpanish: boolean;
  setLanguagePreference: (language: string) => Promise<void>;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [isSpanish, setIsSpanish] = useState(false); // Default to English
  const { toast } = useToast();

  // Simplified implementation that doesn't use Supabase
  const setLanguagePreference = async (language: string) => {
    try {
      setIsSpanish(language === 'es');
      
      // Save to localStorage as fallback
      localStorage.setItem('preferred_language', language);

    } catch (error) {
      console.error('Error updating language:', error);
      toast({
        title: "Error",
        description: "Failed to update language preference",
        variant: "destructive",
      });
    }
  };

  // Load from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred_language');
    if (savedLanguage) {
      setIsSpanish(savedLanguage === 'es');
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ isSpanish, setLanguagePreference }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
