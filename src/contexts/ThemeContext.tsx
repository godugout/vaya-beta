
import React, { createContext, useContext, useEffect } from 'react';

type Theme = 'dark';

interface ThemeContextType {
  theme: Theme;
  // We're adding this as a no-op function to satisfy components that expect it
  toggleTheme: () => void;
  // Adding setTheme to satisfy components that expect it
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {}, // No-op function
  setTheme: () => {}, // No-op function
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Fixed dark theme
  const theme: Theme = 'dark';

  // Set dark mode on the document
  useEffect(() => {
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  }, []);

  // Add no-op functions to satisfy components expecting these functions
  const toggleTheme = () => {
    console.log("Theme toggle attempted, but theme is fixed to dark mode");
    // Do nothing as we're fixed in dark mode
  };

  const setTheme = (newTheme: Theme) => {
    console.log(`Theme change attempted to ${newTheme}, but theme is fixed to dark mode`);
    // Do nothing as we're fixed in dark mode
  };

  const value = {
    theme,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
