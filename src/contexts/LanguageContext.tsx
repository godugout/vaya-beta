
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es' | 'gu' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  isSpanish: boolean;
  isGujarati: boolean;
  isHindi: boolean;
  setLanguagePreference: (language: Language) => void;
}

// Expanded translation dictionary with Gujarati and Hindi
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
  },
  gu: {
    'home': 'ઘર',
    'memories': 'સ્મૃતિઓ',
    'family': 'પરિવાર',
    'stories': 'વાર્તાઓ',
    'settings': 'સેટિંગ્સ',
    'account': 'એકાઉન્ટ',
    'welcome': 'વાયાસ્પેસમાં આપનું સ્વાગત છે',
    'menu': 'મેનૂ',
  },
  hi: {
    'home': 'घर',
    'memories': 'यादें',
    'family': 'परिवार',
    'stories': 'कहानियाँ',
    'settings': 'सेटिंग्स',
    'account': 'खाता',
    'welcome': 'वयास्पेस में आपका स्वागत है',
    'menu': 'मेन्यू',
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
  isSpanish: false,
  isGujarati: false,
  isHindi: false,
  setLanguagePreference: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get initial language from localStorage or default to English
  const getInitialLanguage = (): Language => {
    if (typeof window === 'undefined') return 'en';
    
    const savedLanguage = localStorage.getItem('vaya-language');
    if (savedLanguage === 'en' || savedLanguage === 'es' || savedLanguage === 'gu' || savedLanguage === 'hi') {
      return savedLanguage;
    }
    
    // Check browser language preference
    const browserLang = navigator.language.substring(0, 2);
    if (browserLang === 'es') return 'es';
    if (browserLang === 'gu') return 'gu';
    if (browserLang === 'hi') return 'hi';
    return 'en';
  };

  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  // Derived properties to check language type
  const isSpanish = language === 'es';
  const isGujarati = language === 'gu';
  const isHindi = language === 'hi';

  // Simple translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('vaya-language', language);
  }, [language]);

  // Alias for setLanguage for compatibility with existing components
  const setLanguagePreference = (lang: Language) => {
    setLanguage(lang);
  };

  const value = {
    language,
    setLanguage,
    t,
    isSpanish,
    isGujarati,
    isHindi,
    setLanguagePreference
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
