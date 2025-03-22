
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { useSoftTheme } from '@/contexts/SoftThemeContext';
import { Rocket } from 'lucide-react';

interface SoftThemeToggleProps {
  variant?: 'icon' | 'switch' | 'text';
  className?: string;
}

export const SoftThemeToggle: React.FC<SoftThemeToggleProps> = ({ 
  variant = 'icon',
  className
}) => {
  const { softTheme, toggleSoftTheme, setSoftTheme } = useSoftTheme();
  const isNasaMode = document.body.classList.contains('nasa-theme');
  
  const toggleNasaTheme = () => {
    if (isNasaMode) {
      document.body.classList.remove('nasa-theme', 'cosmic-bg');
      
      // Remove stars
      const starsContainer = document.querySelector('.stars-container');
      if (starsContainer) {
        document.body.removeChild(starsContainer);
      }
    } else {
      document.body.classList.add('nasa-theme', 'cosmic-bg');
      
      // Generate stars
      const createStars = () => {
        const starsContainer = document.createElement('div');
        starsContainer.className = 'stars-container';
        starsContainer.style.position = 'fixed';
        starsContainer.style.top = '0';
        starsContainer.style.left = '0';
        starsContainer.style.width = '100%';
        starsContainer.style.height = '100%';
        starsContainer.style.zIndex = '-1';
        starsContainer.style.overflow = 'hidden';
        
        for (let i = 0; i < 100; i++) {
          const star = document.createElement('div');
          star.className = 'star';
          star.style.left = `${Math.random() * 100}%`;
          star.style.top = `${Math.random() * 100}%`;
          starsContainer.appendChild(star);
        }
        
        document.body.appendChild(starsContainer);
      };
      
      createStars();
    }
  };
  
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
        
        {/* NASA Mode Toggle */}
        <div className="ml-4 flex items-center gap-2">
          <Rocket className="h-4 w-4" />
          <Switch 
            checked={isNasaMode}
            onCheckedChange={toggleNasaTheme}
            aria-label="Toggle NASA mode"
          />
          <span className="text-sm">NASA</span>
        </div>
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className="flex gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleSoftTheme}
          className={className}
        >
          {softTheme === 'default' ? "Enable Soft UI" : "Disable Soft UI"}
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleNasaTheme}
          className={cn("flex items-center gap-1", className)}
        >
          <Rocket className="h-4 w-4" />
          {isNasaMode ? "Disable NASA Mode" : "Enable NASA Mode"}
        </Button>
      </div>
    );
  }

  // Default icon variant
  return (
    <div className="flex items-center gap-2">
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
      
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleNasaTheme}
        title={isNasaMode ? "Disable NASA Mode" : "Enable NASA Mode"}
        className={className}
      >
        <Rocket className="h-5 w-5" />
      </Button>
    </div>
  );
};
