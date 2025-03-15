
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ButtonPulseEffect } from './button/ButtonPulseEffect';
import { RecordingButtonIcon } from './button/RecordingButtonIcon';
import { motion } from 'framer-motion';
import { useAnimation } from '@/components/animation/AnimationProvider';

export type RecordingState = 'idle' | 'recording' | 'processing';

interface EnhancedRecordingButtonProps {
  state: RecordingState;
  onClick: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const EnhancedRecordingButton = ({
  state,
  onClick,
  disabled = false,
  size = 'md',
  className,
}: EnhancedRecordingButtonProps) => {
  const { isReduced } = useAnimation();
  
  // Size configurations
  const sizeConfig = {
    sm: { container: 'h-12 w-12', icon: 'h-4 w-4' },
    md: { container: 'h-16 w-16', icon: 'h-6 w-6' },
    lg: { container: 'h-20 w-20', icon: 'h-8 w-8' },
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Pulse effect */}
      <ButtonPulseEffect 
        isActive={state === 'recording'} 
        isReduced={isReduced}
        size={sizeConfig[size].container}
      />

      {/* Main button */}
      <motion.div
        className="relative"
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <motion.button
          className={cn(
            'rounded-full flex items-center justify-center text-white',
            sizeConfig[size].container,
            disabled && 'opacity-70 cursor-not-allowed',
            className
          )}
          initial={{ backgroundColor: 'rgb(108, 92, 231)' }}
          animate={{
            backgroundColor: 
              state === 'recording' 
                ? 'rgb(255, 118, 117)' 
                : state === 'processing' 
                  ? 'rgb(253, 121, 168)' 
                  : 'rgb(108, 92, 231)',
          }}
          onClick={onClick}
          disabled={disabled || state === 'processing'}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
        >
          <RecordingButtonIcon 
            state={state} 
            iconSize={sizeConfig[size].icon} 
          />
        </motion.button>
      </motion.div>
    </div>
  );
};
