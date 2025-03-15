
import React, { createContext, useContext, useState } from 'react';
import { AnimatedContainer } from '../animation/AnimatedContainer';

interface WeddingModeContextType {
  isActive: boolean;
  toggleWeddingMode: () => void;
  theme: 'classic' | 'modern' | 'rustic';
  setTheme: (theme: 'classic' | 'modern' | 'rustic') => void;
}

const WeddingModeContext = createContext<WeddingModeContextType>({
  isActive: false,
  toggleWeddingMode: () => {},
  theme: 'classic',
  setTheme: () => {},
});

export const useWeddingMode = () => useContext(WeddingModeContext);

export const WeddingModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [theme, setTheme] = useState<'classic' | 'modern' | 'rustic'>('classic');

  const toggleWeddingMode = () => {
    setIsActive(prev => !prev);
  };

  return (
    <WeddingModeContext.Provider 
      value={{ 
        isActive, 
        toggleWeddingMode, 
        theme, 
        setTheme 
      }}
    >
      {isActive ? (
        <AnimatedContainer
          variant="fade"
          className="wedding-mode-active"
          duration={0.5}
        >
          {children}
        </AnimatedContainer>
      ) : (
        children
      )}
    </WeddingModeContext.Provider>
  );
};
