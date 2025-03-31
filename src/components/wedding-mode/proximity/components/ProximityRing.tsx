
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProximityRingProps {
  ringSize: number;
  ringClass: string;
  delay?: number;
}

export function ProximityRing({ ringSize, ringClass, delay = 0 }: ProximityRingProps) {
  return (
    <motion.div
      className={cn(
        "rounded-full border border-dashed absolute",
        ringClass
      )}
      style={{
        width: `${ringSize * 120}px`,
        height: `${ringSize * 120}px`,
      }}
      initial={{ opacity: 0.2 }}
      animate={{ opacity: [0.2, 0.3, 0.2] }}
      transition={{ 
        duration: 4, 
        repeat: Infinity, 
        delay: delay,
        ease: "easeInOut" // Changed from potential "ease-in-out" to "easeInOut"
      }}
    />
  );
}
