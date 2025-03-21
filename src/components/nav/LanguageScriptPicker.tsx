
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import { useLanguage, Language } from '@/contexts/LanguageContext';

interface LanguageOption {
  id: Language;
  name: string;
  nativeName: string;
  script: string;
}

// Language options with script information
const languageOptions: LanguageOption[] = [
  { id: 'en', name: 'English', nativeName: 'English', script: 'Latin' },
  { id: 'es', name: 'Spanish', nativeName: 'Español', script: 'Latin' },
  { id: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', script: 'Gujarati' },
  { id: 'hi', name: 'Hindi', nativeName: 'हिन्दी', script: 'Devanagari' }
];

export const LanguageScriptPicker: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  
  // Find the current language option
  const currentLanguage = languageOptions.find(option => option.id === language) 
    || languageOptions[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="px-2">
          <Languages className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline-block">{currentLanguage.nativeName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{t('settings')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {languageOptions.map((option) => (
          <DropdownMenuItem
            key={option.id}
            className={`flex items-center justify-between ${language === option.id ? 'bg-muted' : ''}`}
            onClick={() => setLanguage(option.id)}
          >
            <span className="flex items-center">
              <span>{option.nativeName}</span>
            </span>
            <span className="text-xs text-muted-foreground">{option.script}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
