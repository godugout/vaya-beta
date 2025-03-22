
import React, { createContext, useContext, useState, useEffect } from 'react';

type SoftThemeMode = 'default' | 'soft';

interface SoftThemeContextType {
  softTheme: SoftThemeMode;
  toggleSoftTheme: () => void;
  setSoftTheme: (theme: SoftThemeMode) => void;
}

const SoftThemeContext = createContext<SoftThemeContextType>({
  softTheme: 'default',
  toggleSoftTheme: () => {},
  setSoftTheme: () => {},
});

export const useSoftTheme = () => useContext(SoftThemeContext);

interface SoftThemeProviderProps {
  children: React.ReactNode;
}

export const SoftThemeProvider: React.FC<SoftThemeProviderProps> = ({ children }) => {
  const [softTheme, setSoftTheme] = useState<SoftThemeMode>('default');

  // Initialize from local storage
  useEffect(() => {
    const storedTheme = localStorage.getItem('softTheme') as SoftThemeMode | null;
    if (storedTheme) {
      setSoftTheme(storedTheme);
    }
  }, []);

  // Update document and localStorage when theme changes
  useEffect(() => {
    document.documentElement.classList.remove('soft-theme');
    if (softTheme === 'soft') {
      document.documentElement.classList.add('soft-theme');
    }
    localStorage.setItem('softTheme', softTheme);
  }, [softTheme]);

  const toggleSoftTheme = () => {
    setSoftTheme(prevTheme => prevTheme === 'default' ? 'soft' : 'default');
  };

  return (
    <SoftThemeContext.Provider value={{ softTheme, toggleSoftTheme, setSoftTheme }}>
      {children}
    </SoftThemeContext.Provider>
  );
};
