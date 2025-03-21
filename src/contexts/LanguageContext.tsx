
import React, { createContext, useContext, useState, useEffect } from 'react';

// Expanded type to include more languages
export type Language = 'en' | 'es' | 'gu' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  isCurrentLanguage: (lang: Language) => boolean;
  setLanguagePreference: (language: Language) => void;
}

// Expanded translation dictionary with more languages and keys
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
    'recording': 'Recording',
    'voice': 'Voice',
    'transcription': 'Transcription',
    'save': 'Save',
    'cancel': 'Cancel',
    'edit': 'Edit',
    'delete': 'Delete',
    'loading': 'Loading...',
    'retry': 'Retry',
    'back': 'Back',
    'next': 'Next',
    'finish': 'Finish',
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
    'recording': 'Grabación',
    'voice': 'Voz',
    'transcription': 'Transcripción',
    'save': 'Guardar',
    'cancel': 'Cancelar',
    'edit': 'Editar',
    'delete': 'Eliminar',
    'loading': 'Cargando...',
    'retry': 'Reintentar',
    'back': 'Atrás',
    'next': 'Siguiente',
    'finish': 'Finalizar',
  },
  gu: {
    'home': 'ઘર',
    'memories': 'યાદો',
    'family': 'પરિવાર',
    'stories': 'વાર્તાઓ',
    'settings': 'સેટિંગ્સ',
    'account': 'એકાઉન્ટ',
    'welcome': 'વાયાસ્પેસમાં આપનું સ્વાગત છે',
    'menu': 'મેનુ',
    'recording': 'રેકોર્ડિંગ',
    'voice': 'અવાજ',
    'transcription': 'ટ્રાન્સક્રિપ્શન',
    'save': 'સાચવો',
    'cancel': 'રદ કરો',
    'edit': 'ફેરફાર કરો',
    'delete': 'કાઢી નાખો',
    'loading': 'લોડ થઈ રહ્યું છે...',
    'retry': 'ફરી પ્રયાસ કરો',
    'back': 'પાછા',
    'next': 'આગળ',
    'finish': 'પૂર્ણ',
  },
  hi: {
    'home': 'होम',
    'memories': 'यादें',
    'family': 'परिवार',
    'stories': 'कहानियां',
    'settings': 'सेटिंग्स',
    'account': 'अकाउंट',
    'welcome': 'वयास्पेस में आपका स्वागत है',
    'menu': 'मेन्यू',
    'recording': 'रिकॉर्डिंग',
    'voice': 'आवाज़',
    'transcription': 'ट्रांसक्रिप्शन',
    'save': 'सहेजें',
    'cancel': 'रद्द करें',
    'edit': 'संपादित करें',
    'delete': 'हटाएं',
    'loading': 'लोड हो रहा है...',
    'retry': 'पुनः प्रयास करें',
    'back': 'वापस',
    'next': 'आगे',
    'finish': 'समाप्त',
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
  isCurrentLanguage: () => false,
  setLanguagePreference: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get initial language from localStorage or default to English
  const getInitialLanguage = (): Language => {
    if (typeof window === 'undefined') return 'en';
    
    const savedLanguage = localStorage.getItem('vaya-language');
    if (savedLanguage && ['en', 'es', 'gu', 'hi'].includes(savedLanguage)) {
      return savedLanguage as Language;
    }
    
    // Check browser language preference
    const browserLang = navigator.language.substring(0, 2);
    if (browserLang === 'es') return 'es';
    if (browserLang === 'gu') return 'gu';
    if (browserLang === 'hi') return 'hi';
    return 'en';
  };

  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  // Helper function to check current language
  const isCurrentLanguage = (lang: Language): boolean => {
    return language === lang;
  };

  // Translation function with enhanced fallback behavior
  const t = (key: string): string => {
    // First try the requested language
    if (translations[language][key]) {
      return translations[language][key];
    }
    
    // Fall back to English if translation not found
    if (language !== 'en' && translations['en'][key]) {
      console.warn(`Translation missing for key "${key}" in "${language}", falling back to English`);
      return translations['en'][key];
    }
    
    // Return the key itself as last resort
    return key;
  };

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('vaya-language', language);
    
    // Set the document language for accessibility
    document.documentElement.lang = language;
    
    // Configure RTL support for languages that require it (not needed for current languages)
    // if (['ar', 'he'].includes(language)) {
    //   document.documentElement.dir = 'rtl';
    // } else {
    //   document.documentElement.dir = 'ltr';
    // }
  }, [language]);

  // Alias for setLanguage for compatibility with existing components
  const setLanguagePreference = (lang: Language) => {
    setLanguage(lang);
  };

  const value = {
    language,
    setLanguage,
    t,
    isCurrentLanguage,
    setLanguagePreference
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
