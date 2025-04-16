
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';

type AnimationPreference = 'full' | 'reduced' | 'none';

interface AnimationContextType {
  preference: AnimationPreference;
  setPreference: (pref: AnimationPreference) => void;
  isReduced: boolean;
  isMobile: boolean;
  duration: {
    fast: number;
    standard: number;
    slow: number;
  };
  easing: {
    standard: [number, number, number, number];
    bounce: [number, number, number, number];
    gentle: [number, number, number, number];
    elastic: [number, number, number, number];
  };
}

const defaultDuration = {
  fast: 200,
  standard: 350,
  slow: 500
};

// Using explicit tuple types to ensure correct type checking
const defaultEasing = {
  standard: [0.4, 0, 0.2, 1] as [number, number, number, number],
  bounce: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  gentle: [0.4, 0.0, 0.2, 1] as [number, number, number, number],
  elastic: [0.68, -0.6, 0.32, 1.6] as [number, number, number, number]
};

const AnimationContext = createContext<AnimationContextType>({
  preference: 'full',
  setPreference: () => {},
  isReduced: false,
  isMobile: false,
  duration: defaultDuration,
  easing: defaultEasing
});

export const useAnimation = () => useContext(AnimationContext);

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
  
  // Use the media query hook to detect mobile screens
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    localStorage.setItem('vaya-animation-preference', preference);
    
    setIsReduced(preference === 'reduced' || preference === 'none' || isMobile);
    
    // Set data attribute for CSS to recognize
    document.documentElement.setAttribute('data-motion', preference);
    if (isMobile) {
      document.documentElement.setAttribute('data-mobile-motion', 'reduced');
    } else {
      document.documentElement.removeAttribute('data-mobile-motion');
    }
  }, [preference, isMobile]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = () => {
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
    isMobile,
    duration: defaultDuration,
    easing: defaultEasing
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};
