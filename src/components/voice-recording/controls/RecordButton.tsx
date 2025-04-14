
import { motion } from "framer-motion";
import { Mic, Square, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type RecordingState = 'idle' | 'recording' | 'processing';

interface RecordButtonProps {
  state: RecordingState;
  onClick: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const RecordButton = ({
  state,
  onClick,
  disabled = false,
  size = 'md'
}: RecordButtonProps) => {
  const sizeClasses = {
    sm: 'h-12 w-12',
    md: 'h-16 w-16',
    lg: 'h-20 w-20'
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <motion.button
      disabled={disabled || state === 'processing'}
      className={cn(
        'rounded-full flex items-center justify-center transition-all',
        sizeClasses[size],
        state === 'recording' 
          ? 'bg-red-500 hover:bg-red-600' 
          : 'bg-indigo-600 hover:bg-indigo-700',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {state === 'idle' && (
        <Mic className={cn('text-white', iconSizes[size])} />
      )}
      {state === 'recording' && (
        <Square className={cn('text-white', iconSizes[size])} />
      )}
      {state === 'processing' && (
        <Loader2 className={cn('text-white animate-spin', iconSizes[size])} />
      )}
    </motion.button>
  );
};
