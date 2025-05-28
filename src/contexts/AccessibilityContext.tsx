
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  voiceCommands: boolean;
  screenReader: boolean;
  touchTargetSize: 'standard' | 'large' | 'extra-large';
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSettings: (updates: Partial<AccessibilitySettings>) => void;
  getTouchTargetClass: () => string;
  getTextSizeClass: () => string;
  announceToScreenReader: (message: string) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    voiceCommands: false,
    screenReader: false,
    touchTargetSize: 'large',
  });

  useEffect(() => {
    // Auto-detect system preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
    
    setSettings(prev => ({
      ...prev,
      reducedMotion: prefersReducedMotion,
      highContrast: prefersHighContrast,
    }));
  }, []);

  const updateSettings = (updates: Partial<AccessibilitySettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const getTouchTargetClass = () => {
    switch (settings.touchTargetSize) {
      case 'standard': return 'min-h-[44px] min-w-[44px]';
      case 'large': return 'min-h-[60px] min-w-[60px]';
      case 'extra-large': return 'min-h-[80px] min-w-[80px]';
      default: return 'min-h-[60px] min-w-[60px]';
    }
  };

  const getTextSizeClass = () => {
    return settings.largeText ? 'text-lg' : 'text-base';
  };

  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  };

  return (
    <AccessibilityContext.Provider value={{
      settings,
      updateSettings,
      getTouchTargetClass,
      getTextSizeClass,
      announceToScreenReader,
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibilityContext = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibilityContext must be used within an AccessibilityProvider');
  }
  return context;
};
