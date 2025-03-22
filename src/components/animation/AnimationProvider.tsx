
import React, { createContext, useState, useContext, useEffect } from 'react';
import { AnimationContextType, AnimationPreference, AnimationDurations, AnimationEasings } from '@/types/animation';

const defaultDurations: AnimationDurations = {
  fast: 200,
  standard: 400,
  slow: 600
};

const defaultEasings: AnimationEasings = {
  ease: 'ease-out',
  linear: 'linear',
  elastic: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
  bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  standard: 'ease-in-out'
};

const defaultContext: AnimationContextType = {
  isEnabled: true,
  isReduced: false,
  preference: 'enabled',
  setPreference: () => {},
  duration: defaultDurations,
  easing: defaultEasings,
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
  
  const value = {
    isEnabled,
    isReduced,
    preference,
    setPreference,
    duration: defaultDurations,
    easing: defaultEasings,
  };
  
  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};
