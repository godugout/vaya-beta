
import React, { forwardRef } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { useAccessibilityContext } from '@/contexts/AccessibilityContext';
import { cn } from '@/lib/utils';

interface AccessibleButtonProps extends ButtonProps {
  ariaLabel?: string;
  hapticFeedback?: boolean;
  announcement?: string;
}

export const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ children, className, ariaLabel, hapticFeedback = true, announcement, onClick, ...props }, ref) => {
    const { getTouchTargetClass, announceToScreenReader, settings } = useAccessibilityContext();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      // Haptic feedback for mobile devices
      if (hapticFeedback && 'vibrate' in navigator) {
        navigator.vibrate(50);
      }

      // Screen reader announcement
      if (announcement) {
        announceToScreenReader(announcement);
      }

      onClick?.(event);
    };

    return (
      <Button
        ref={ref}
        className={cn(
          getTouchTargetClass(),
          'transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/50',
          settings.highContrast && 'border-2 border-current',
          className
        )}
        aria-label={ariaLabel}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

AccessibleButton.displayName = 'AccessibleButton';
