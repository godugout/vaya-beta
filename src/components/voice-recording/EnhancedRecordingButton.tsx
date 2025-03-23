
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Mic, StopCircle, Loader } from 'lucide-react';

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
  const sizeConfig = {
    sm: { container: 'h-12 w-12', icon: 'h-4 w-4' },
    md: { container: 'h-16 w-16', icon: 'h-6 w-6' },
    lg: { container: 'h-20 w-20', icon: 'h-8 w-8' },
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Pulse effect when recording */}
      {state === 'recording' && (
        <motion.div
          className={cn(
            'absolute rounded-full',
            sizeConfig[size].container
          )}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 0.2, 0.7],
            borderWidth: ['0px', '3px', '0px'],
            borderColor: ['rgba(255,0,0,0.5)', 'rgba(255,0,0,0.2)', 'rgba(255,0,0,0.5)']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
      
      {/* Main button */}
      <motion.button
        className={cn(
          'rounded-full flex items-center justify-center text-white',
          sizeConfig[size].container,
          {
            'bg-gradient-to-r from-hanuman-cosmic-purple to-hanuman-cosmic-blue': state === 'idle',
            'bg-red-500': state === 'recording',
            'bg-amber-500': state === 'processing'
          },
          disabled && 'opacity-70 cursor-not-allowed',
          className
        )}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        disabled={disabled || state === 'processing'}
      >
        {state === 'idle' && (
          <Mic className={sizeConfig[size].icon} />
        )}
        {state === 'recording' && (
          <StopCircle className={sizeConfig[size].icon} />
        )}
        {state === 'processing' && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          >
            <Loader className={sizeConfig[size].icon} />
          </motion.div>
        )}
      </motion.button>
    </div>
  );
};
