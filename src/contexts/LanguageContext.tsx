
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Simple translation dictionary - can be expanded later
const translations: Record<Language, Record<string, string>> = {
  en: {
    'home': 'Home',
    'memories': 'Memories',
    'family': 'Family',
    'stories': 'Stories',
    'settings': 'Settings',
    'account': 'Account',
    'welcome': 'Welcome to VayaSpace',
    'menu': 'Menu',
  },
  es: {
    'home': 'Inicio',
    'memories': 'Recuerdos',
    'family': 'Familia',
    'stories': 'Historias',
    'settings': 'Configuración',
    'account': 'Cuenta',
    'welcome': 'Bienvenido a VayaSpace',
    'menu': 'Menú',
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get initial language from localStorage or default to English
  const getInitialLanguage = (): Language => {
    if (typeof window === 'undefined') return 'en';
    
    const savedLanguage = localStorage.getItem('vaya-language');
    if (savedLanguage === 'en' || savedLanguage === 'es') {
      return savedLanguage;
    }
    
    // Check browser language preference
    const browserLang = navigator.language.substring(0, 2);
    return browserLang === 'es' ? 'es' : 'en';
  };

  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  // Simple translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('vaya-language', language);
  }, [language]);

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
