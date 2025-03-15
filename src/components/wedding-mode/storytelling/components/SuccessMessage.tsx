
import React from 'react';
import { AnimatedContainer } from '@/components/animation/AnimatedContainer';
import { SuccessAnimation } from '@/components/animation/SuccessAnimation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SuccessMessageProps {
  accentClass: string;
  onAddAnother: () => void;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({
  accentClass,
  onAddAnother
}) => {
  return (
    <AnimatedContainer variant="scale" className="py-12 text-center">
      <SuccessAnimation 
        size="lg" 
        message="Your story has been added to the collection!" 
      />
      <Button 
        variant="link" 
        className={cn("mt-4", accentClass)}
        onClick={onAddAnother}
      >
        Add another story
      </Button>
    </AnimatedContainer>
  );
};
