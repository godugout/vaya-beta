
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AnimationContextType {
  isReduced: boolean;
  enableAnimations: () => void;
  disableAnimations: () => void;
  toggleAnimations: () => void;
}

const AnimationContext = createContext<AnimationContextType>({
  isReduced: false,
  enableAnimations: () => {},
  disableAnimations: () => {},
  toggleAnimations: () => {},
});

interface AnimationProviderProps {
  children: ReactNode;
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({ children }) => {
  // Initialize based on user's system preference
  const [isReduced, setIsReduced] = useState<boolean>(false);
  
  useEffect(() => {
    // Check for prefers-reduced-motion media query
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReduced(mediaQuery.matches);
    
    // Add listener for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setIsReduced(e.matches);
    };
    
    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    
    // Safari < 14
    else if ('addListener' in mediaQuery) {
      // @ts-ignore - older API
      mediaQuery.addListener(handleChange);
      return () => {
        // @ts-ignore - older API
        mediaQuery.removeListener(handleChange);
      };
    }
  }, []);
  
  const enableAnimations = () => setIsReduced(false);
  const disableAnimations = () => setIsReduced(true);
  const toggleAnimations = () => setIsReduced(prev => !prev);
  
  return (
    <AnimationContext.Provider value={{ 
      isReduced, 
      enableAnimations, 
      disableAnimations,
      toggleAnimations
    }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => useContext(AnimationContext);
