
import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Square, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecordingButtonIconProps {
  state: 'idle' | 'recording' | 'processing';
  iconSize?: string;
}

export const RecordingButtonIcon: React.FC<RecordingButtonIconProps> = ({ 
  state, 
  iconSize = 'h-6 w-6' 
}) => {
  // Icon variants based on state
  const icons = {
    idle: <Mic className={cn(iconSize, "text-white")} />,
    recording: <Square className={cn(iconSize, "text-white")} />,
    processing: (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <Loader className={cn(iconSize, "text-white")} />
      </motion.div>
    )
  };
  
  return icons[state];
};
