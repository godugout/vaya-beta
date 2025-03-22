
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonPulseEffectProps {
  isActive: boolean;
  isReduced?: boolean;
  size?: string;
}

export const ButtonPulseEffect: React.FC<ButtonPulseEffectProps> = ({ 
  isActive, 
  isReduced = false,
  size = 'h-16 w-16' 
}) => {
  if (!isActive) return null;
  
  const pulseAnimation = isReduced ? {} : {
    scale: [1, 1.2, 1],
    opacity: [0.7, 0.3, 0]
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        className={cn(
          "rounded-full bg-red-500/30",
          size
        )}
        animate={pulseAnimation}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop"
        }}
      />
    </div>
  );
};
