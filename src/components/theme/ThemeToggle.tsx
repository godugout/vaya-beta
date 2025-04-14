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
  
  /* Original code commented out as we don't need theme toggle anymore
  if (variant === 'switch') {
    return (
      <div className={cn("flex items-center gap-4", className)}>
        <div className="flex items-center gap-2">
          <Moon size={16} className="text-muted-foreground" />
          <Switch 
            checked={theme === 'dark'}
            onCheckedChange={toggleTheme}
            aria-label="Toggle dark mode"
          />
          <Sun size={16} className="text-muted-foreground" />
        </div>
        
        {showSoftToggle && (
          <SoftThemeToggle variant="switch" />
        )}
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className="flex flex-col sm:flex-row gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleTheme}
          className={className}
        >
          {theme === 'light' ? (
            <div className="flex items-center gap-2">
              <Moon size={16} />
              <span>Dark Mode</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Sun size={16} />
              <span>Light Mode</span>
            </div>
          )}
        </Button>
        
        {showSoftToggle && (
          <SoftThemeToggle variant="text" />
        )}
      </div>
    );
  }

  // Default icon variant
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className={className}
      >
        {theme === 'light' ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Sun className="h-5 w-5" />
        )}
      </Button>
      
      {showSoftToggle && (
        <SoftThemeToggle variant="icon" />
      )}
    </div>
  );
  */
};
