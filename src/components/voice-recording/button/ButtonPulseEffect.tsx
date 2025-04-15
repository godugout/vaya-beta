
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonPulseEffectProps {
  isActive: boolean;
  isReduced: boolean;
  size: string;
}

export const ButtonPulseEffect = ({ isActive, isReduced, size }: ButtonPulseEffectProps) => {
  // Skip animation if reduced motion is preferred
  if (isReduced) {
    return null;
  }
  
  // Define animation variants
  const pulseVariants = {
    inactive: {
      scale: 1,
      opacity: 0,
    },
    active: {
      scale: [1, 1.5, 1],
      opacity: [0.7, 0, 0.7],
      transition: {
        repeat: Infinity,
        duration: 1.5,
      },
    },
  };

  return (
    <motion.div
      className={cn(
        'absolute rounded-full bg-red-500 opacity-70',
        size
      )}
      variants={pulseVariants}
      initial="inactive"
      animate={isActive ? 'active' : 'inactive'}
    />
  );
};
