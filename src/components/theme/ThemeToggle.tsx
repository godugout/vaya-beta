
import React from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  variant?: 'icon' | 'switch' | 'text';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  variant = 'icon',
  className 
}) => {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (variant === 'switch') {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Sun size={16} className="text-muted-foreground" />
        <Switch 
          checked={theme === 'dark'}
          onCheckedChange={toggleTheme}
          aria-label="Toggle dark mode"
        />
        <Moon size={16} className="text-muted-foreground" />
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
        {theme === 'dark' ? (
          <div className="flex items-center gap-2">
            <Sun size={16} />
            <span>Light Mode</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Moon size={16} />
            <span>Dark Mode</span>
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
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
};
