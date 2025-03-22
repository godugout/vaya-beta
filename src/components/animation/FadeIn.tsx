
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useAnimation } from './AnimationProvider';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  className = ''
}) => {
  const { isReduced } = useAnimation();
  
  if (isReduced) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: duration, 
        delay: delay,
        ease: [0.23, 1, 0.32, 1] // Cubic bezier for smooth animation
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
