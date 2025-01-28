import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export const LanguageSelector = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const { isSpanish, setLanguagePreference } = useLanguage();
  const currentLanguage = isSpanish ? 'es' : 'en';

  const handleLanguageChange = async (languageCode: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // For testing purposes, allow language change without authentication
        setLanguagePreference(languageCode);
        toast({
          title: "Language Updated",
          description: "Language preference updated (test mode)",
        });
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .update({ preferred_language: languageCode })
        .eq('id', user.id);

      if (error) throw error;
      
      await setLanguagePreference(languageCode);
      
      toast({
        title: "Language Updated",
        description: "Your language preference has been saved.",
      });
    } catch (error) {
      console.error('Error updating language:', error);
      toast({
        title: "Error",
        description: "Failed to update language preference",
        variant: "destructive",
      });
    }
    setIsOpen(false);
  };

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="w-8 h-8 hover:bg-[#333333] relative"
        >
          <span className="text-lg">{currentLang.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-sm">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </div>
            {currentLanguage === language.code && (
              <Check className="h-4 w-4 ml-2" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};