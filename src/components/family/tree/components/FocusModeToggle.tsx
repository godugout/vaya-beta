
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

interface FocusModeToggleProps {
  focusModeEnabled: boolean;
  toggleFocusMode: () => void;
}

export const FocusModeToggle = ({ 
  focusModeEnabled, 
  toggleFocusMode 
}: FocusModeToggleProps) => {
  return (
    <Button 
      variant={focusModeEnabled ? "default" : "outline"}
      className="flex items-center justify-center gap-2"
      onClick={toggleFocusMode}
    >
      <User className="w-4 h-4" />
      {focusModeEnabled ? "Exit Focus Mode" : "Focus Mode"}
    </Button>
  );
};
