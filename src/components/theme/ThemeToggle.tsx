
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
  variant?: 'icon' | 'switch' | 'text';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  variant = 'icon',
  className 
}) => {
  const { theme, toggleTheme } = useTheme();
  
  if (variant === 'switch') {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Moon size={16} className="text-muted-foreground" />
        <Switch 
          checked={theme === 'dark'}
          onCheckedChange={toggleTheme}
          aria-label="Toggle dark mode"
        />
        <Sun size={16} className="text-muted-foreground" />
      </div>
    );
  }

  if (variant === 'text') {
    return (
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
    );
  }

  // Default icon variant
  return (
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
  );
};
