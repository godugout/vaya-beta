
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CulturalSettings {
  language: 'en' | 'hi' | 'gu' | 'auto';
  familyStructure: 'nuclear' | 'extended' | 'joint' | 'custom';
  visualStyle: 'modern' | 'traditional' | 'minimal';
  glyphSystem: {
    male: string;
    female: string;
    nonBinary: string;
  };
  festivals: Array<{
    name: string;
    date: string;
    significance: string;
  }>;
  traditions: string[];
}

interface CultureContextType {
  settings: CulturalSettings;
  updateSettings: (updates: Partial<CulturalSettings>) => void;
  getPromptContext: () => string;
  getUITranslation: (key: string) => string;
}

const defaultSettings: CulturalSettings = {
  language: 'en',
  familyStructure: 'extended',
  visualStyle: 'modern',
  glyphSystem: {
    male: '△',
    female: '○',
    nonBinary: '□',
  },
  festivals: [],
  traditions: [],
};

const CultureContext = createContext<CultureContextType | undefined>(undefined);

export const CultureProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<CulturalSettings>(defaultSettings);

  const updateSettings = (updates: Partial<CulturalSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const getPromptContext = () => {
    return `Family structure: ${settings.familyStructure}, Language: ${settings.language}, Traditions: ${settings.traditions.join(', ')}`;
  };

  const getUITranslation = (key: string) => {
    // Extension point for internationalization
    return key; // Default to key for now
  };

  return (
    <CultureContext.Provider value={{
      settings,
      updateSettings,
      getPromptContext,
      getUITranslation,
    }}>
      {children}
    </CultureContext.Provider>
  );
};

export const useCultureContext = () => {
  const context = useContext(CultureContext);
  if (!context) {
    throw new Error('useCultureContext must be used within a CultureProvider');
  }
  return context;
};
