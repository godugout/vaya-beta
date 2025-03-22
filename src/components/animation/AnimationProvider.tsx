
import React, { createContext, useState, useContext, useEffect } from 'react';

export type AnimationPreference = 'enabled' | 'reduced' | 'disabled';

export interface AnimationContextType {
  isEnabled: boolean;
  isReduced: boolean;
  preference: AnimationPreference;
  setPreference: (pref: AnimationPreference) => void;
  duration: number;
  easing: string;
}

const defaultContext: AnimationContextType = {
  isEnabled: true,
  isReduced: false,
  preference: 'enabled',
  setPreference: () => {},
  duration: 0.4,
  easing: 'ease-in-out',
};

const AnimationContext = createContext<AnimationContextType>(defaultContext);

export const useAnimation = () => useContext(AnimationContext);

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [preference, setPreference] = useState<AnimationPreference>('enabled');
  const [isEnabled, setIsEnabled] = useState(true);
  const [isReduced, setIsReduced] = useState(false);
  
  // Check system preferences on initial load
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setPreference('reduced');
    }
    
    // Get user preference from localStorage if available
    const savedPreference = localStorage.getItem('animation-preference');
    if (savedPreference) {
      setPreference(savedPreference as AnimationPreference);
    }
  }, []);
  
  // Update state based on preference changes
  useEffect(() => {
    setIsEnabled(preference !== 'disabled');
    setIsReduced(preference === 'reduced');
    
    // Save to localStorage
    localStorage.setItem('animation-preference', preference);
  }, [preference]);
  
  // Calculate animation duration based on preference
  const duration = isReduced ? 0.2 : preference === 'disabled' ? 0 : 0.4;
  const easing = isReduced ? 'ease-out' : 'ease-in-out';
  
  const value = {
    isEnabled,
    isReduced,
    preference,
    setPreference,
    duration,
    easing,
  };
  
  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};
