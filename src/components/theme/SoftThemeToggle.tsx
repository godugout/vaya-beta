
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { useSoftTheme } from '@/contexts/SoftThemeContext';

interface SoftThemeToggleProps {
  variant?: 'icon' | 'switch' | 'text';
  className?: string;
}

export const SoftThemeToggle: React.FC<SoftThemeToggleProps> = ({ 
  variant = 'icon',
  className
}) => {
  const { softTheme, toggleSoftTheme } = useSoftTheme();
  
  if (variant === 'switch') {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <span className="text-sm">Standard</span>
        <Switch 
          checked={softTheme === 'soft'}
          onCheckedChange={toggleSoftTheme}
          aria-label="Toggle soft UI"
        />
        <span className="text-sm">Soft UI</span>
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={toggleSoftTheme}
        className={className}
      >
        {softTheme === 'default' ? "Enable Soft UI" : "Disable Soft UI"}
      </Button>
    );
  }

  // Default icon variant
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSoftTheme}
      title={softTheme === 'default' ? "Enable Soft UI" : "Disable Soft UI"}
      className={className}
    >
      <div className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center">
        <div className={cn("w-3 h-3 rounded-full transition-colors", 
          softTheme === 'soft' ? "bg-current" : "bg-transparent")} 
        />
      </div>
    </Button>
  );
};
