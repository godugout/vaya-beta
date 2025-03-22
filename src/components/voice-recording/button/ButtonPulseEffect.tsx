
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonPulseEffectProps {
  isActive: boolean;
  isReduced?: boolean;
  size?: string;
  color?: string;
}

export const ButtonPulseEffect = ({ 
  isActive, 
  isReduced = false, 
  size = 'h-16 w-16', 
  color = 'rgba(255, 118, 117, 0.3)' 
}: ButtonPulseEffectProps) => {
  if (!isActive) return null;
  
  // Reduced motion alternative
  if (isReduced) {
    return (
      <div 
        className={cn(
          "absolute rounded-full",
          size
        )}
        style={{ 
          backgroundColor: color,
          opacity: 0.5
        }}
      />
    );
  }

  return (
    <>
      {/* First pulse ring */}
      <motion.div
        className={cn(
          "absolute rounded-full",
          size
        )}
        initial={{ opacity: 0, scale: 1 }}
        animate={{ 
          opacity: [0, 0.5, 0], 
          scale: [1, 1.8, 2.2] 
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          repeatType: "loop"
        }}
        style={{ backgroundColor: color }}
      />
      
      {/* Second pulse ring (slightly delayed) */}
      <motion.div
        className={cn(
          "absolute rounded-full",
          size
        )}
        initial={{ opacity: 0, scale: 1 }}
        animate={{ 
          opacity: [0, 0.5, 0], 
          scale: [1, 1.8, 2.2] 
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          repeatType: "loop",
          delay: 0.6 
        }}
        style={{ backgroundColor: color }}
      />
    </>
  );
};
