
import React from 'react';
import { usePremiumTheme } from '@/contexts/PremiumThemeContext';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Sparkles } from "lucide-react";

interface PremiumThemeToggleProps {
  variant?: 'switch' | 'button' | 'icon';
}

export const PremiumThemeToggle = ({ variant = 'button' }: PremiumThemeToggleProps) => {
  const { premiumTheme, togglePremiumTheme } = usePremiumTheme();
  const isPremium = premiumTheme === 'premium';

  if (variant === 'switch') {
    return (
      <Switch
        checked={isPremium}
        onCheckedChange={togglePremiumTheme}
        aria-label="Toggle premium theme"
      />
    );
  }

  if (variant === 'icon') {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={togglePremiumTheme}
        aria-label="Toggle premium theme"
        className={isPremium ? "text-amber-500" : "text-gray-400"}
      >
        <Sparkles className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button 
      variant={isPremium ? "default" : "outline"} 
      size="sm" 
      onClick={togglePremiumTheme}
      className={isPremium ? "bg-gradient-to-r from-amber-500 to-amber-300 border-none" : ""}
    >
      <Sparkles className="mr-2 h-4 w-4" />
      {isPremium ? "Premium Active" : "Activate Premium"}
    </Button>
  );
};

export default PremiumThemeToggle;
