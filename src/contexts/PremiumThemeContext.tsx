
import React, { createContext, useContext, useState, useEffect } from 'react';

type PremiumThemeMode = 'default' | 'premium';

interface PremiumThemeContextType {
  premiumTheme: PremiumThemeMode;
  togglePremiumTheme: () => void;
  setPremiumTheme: (theme: PremiumThemeMode) => void;
}

const PremiumThemeContext = createContext<PremiumThemeContextType>({
  premiumTheme: 'default',
  togglePremiumTheme: () => {},
  setPremiumTheme: () => {},
});

export const usePremiumTheme = () => useContext(PremiumThemeContext);

interface PremiumThemeProviderProps {
  children: React.ReactNode;
}

export const PremiumThemeProvider: React.FC<PremiumThemeProviderProps> = ({ children }) => {
  const [premiumTheme, setPremiumTheme] = useState<PremiumThemeMode>('default');

  // Initialize from local storage
  useEffect(() => {
    const storedTheme = localStorage.getItem('premiumTheme') as PremiumThemeMode | null;
    if (storedTheme) {
      setPremiumTheme(storedTheme);
    }
  }, []);

  // Update document and localStorage when theme changes
  useEffect(() => {
    document.documentElement.classList.remove('premium-theme');
    if (premiumTheme === 'premium') {
      document.documentElement.classList.add('premium-theme');
    }
    localStorage.setItem('premiumTheme', premiumTheme);
  }, [premiumTheme]);

  const togglePremiumTheme = () => {
    setPremiumTheme(prevTheme => prevTheme === 'default' ? 'premium' : 'default');
  };

  return (
    <PremiumThemeContext.Provider value={{ premiumTheme, togglePremiumTheme, setPremiumTheme }}>
      {children}
    </PremiumThemeContext.Provider>
  );
};
