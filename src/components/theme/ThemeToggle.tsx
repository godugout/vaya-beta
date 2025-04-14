import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import { SoftThemeToggle } from './SoftThemeToggle';

interface ThemeToggleProps {
  variant?: 'icon' | 'switch' | 'text';
  className?: string;
  showSoftToggle?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  variant = 'icon',
  className,
  showSoftToggle = false
}) => {
  const { theme, toggleTheme } = useTheme();
  
  // Since we're locked in dark mode, let's return null or remove this component
  // This is the simplest approach without breaking the API
  
  // Alternative: Return just the SoftThemeToggle if that's requested
  if (showSoftToggle) {
    return <SoftThemeToggle variant={variant} className={className} />;
  }
  
  // Otherwise return null - component effectively disabled
  return null;
};
