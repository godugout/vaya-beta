
import { motion } from 'framer-motion';
import { Mic, Square, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
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

  // Animation variants based on recording state
  const buttonVariants = {
    idle: {
      scale: 1,
      backgroundColor: 'rgb(108, 92, 231)',
    },
    recording: {
      scale: 1,
      backgroundColor: 'rgb(255, 118, 117)',
    },
    processing: {
      scale: 1,
      backgroundColor: 'rgb(253, 121, 168)',
    },
  };

  const pulseVariants = {
    idle: {
      scale: 1,
      opacity: 0,
    },
    recording: {
      scale: [1, 1.5, 1],
      opacity: [0.7, 0, 0.7],
      transition: {
        repeat: Infinity,
        duration: 1.5,
      },
    },
    processing: {
      scale: 1,
      opacity: 0,
    },
  };

  return (
    <div className="relative flex items-center justify-center">
      {!isReduced && (
        <motion.div
          className={cn(
            'absolute rounded-full bg-red-500 opacity-70',
            sizeConfig[size].container
          )}
          variants={pulseVariants}
          initial="idle"
          animate={state}
        />
      )}

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
          variants={buttonVariants}
          initial="idle"
          animate={state}
          onClick={onClick}
          disabled={disabled || state === 'processing'}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
        >
          {state === 'idle' && <Mic className={sizeConfig[size].icon} />}
          {state === 'recording' && <Square className={sizeConfig[size].icon} />}
          {state === 'processing' && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            >
              <Loader2 className={sizeConfig[size].icon} />
            </motion.div>
          )}
        </motion.button>
      </motion.div>
    </div>
  );
};
