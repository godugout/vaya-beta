
import React from 'react';
import { MessageSquare, Layers } from 'lucide-react';
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
  const isSoft = softTheme === 'soft';
  
  if (variant === 'switch') {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Layers size={16} className="text-muted-foreground" />
        <Switch 
          checked={isSoft}
          onCheckedChange={toggleSoftTheme}
          aria-label="Toggle soft mode"
        />
        <MessageSquare size={16} className="text-muted-foreground" />
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
        {isSoft ? (
          <div className="flex items-center gap-2">
            <Layers size={16} />
            <span>Classic UI</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <MessageSquare size={16} />
            <span>Soft UI</span>
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
      onClick={toggleSoftTheme}
      aria-label="Toggle UI theme"
      className={className}
    >
      {isSoft ? (
        <Layers className="h-5 w-5" />
      ) : (
        <MessageSquare className="h-5 w-5" />
      )}
    </Button>
  );
};
