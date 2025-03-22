
import { Mic, Square, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type RecordingState = 'idle' | 'recording' | 'processing';

interface RecordingButtonIconProps {
  state: RecordingState;
  iconSize?: string;
}

export const RecordingButtonIcon = ({ 
  state, 
  iconSize = "h-6 w-6" 
}: RecordingButtonIconProps) => {
  switch (state) {
    case 'recording':
      return (
        <Square className={cn("text-white", iconSize)} />
      );
      
    case 'processing':
      return (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className={cn("text-white", iconSize)} />
        </motion.div>
      );
      
    case 'idle':
    default:
      return (
        <Mic className={cn("text-white", iconSize)} />
      );
  }
};
