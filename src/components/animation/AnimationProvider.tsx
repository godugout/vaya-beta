
import React, { createContext, useContext, useState, useEffect } from 'react';

type AnimationPreference = 'full' | 'reduced' | 'none';

interface AnimationContextType {
  preference: AnimationPreference;
  setPreference: (pref: AnimationPreference) => void;
  isReduced: boolean;
  duration: {
    fast: number;
    standard: number;
    slow: number;
  };
  easing: {
    standard: string;
    bounce: string;
    gentle: string;
    elastic: string;
  };
}

const defaultDuration = {
  fast: 200,
  standard: 350,
  slow: 500
};

const defaultEasing = {
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  gentle: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  elastic: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)'
};

const AnimationContext = createContext<AnimationContextType>({
  preference: 'full',
  setPreference: () => {},
  isReduced: false,
  duration: defaultDuration,
  easing: defaultEasing
});

export const useAnimation = () => useContext(AnimationContext);

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get initial preference from localStorage or system preference
  const getInitialPreference = (): AnimationPreference => {
    if (typeof window === 'undefined') return 'full';
    
    const saved = localStorage.getItem('vaya-animation-preference');
    if (saved && ['full', 'reduced', 'none'].includes(saved)) {
      return saved as AnimationPreference;
    }
    
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'reduced' : 'full';
  };

  const [preference, setPreference] = useState<AnimationPreference>(getInitialPreference);
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    // Update localStorage when preference changes
    localStorage.setItem('vaya-animation-preference', preference);
    
    // Update isReduced flag
    setIsReduced(preference === 'reduced' || preference === 'none');
    
    // Apply a data attribute to the document for CSS targeting
    document.documentElement.setAttribute('data-motion', preference);
  }, [preference]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = () => {
      // Only auto-update if the user hasn't explicitly set a preference
      if (!localStorage.getItem('vaya-animation-preference')) {
        setPreference(mediaQuery.matches ? 'reduced' : 'full');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const value = {
    preference,
    setPreference,
    isReduced,
    duration: defaultDuration,
    easing: defaultEasing
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};
