
import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  location: string;
  mode?: 'fade' | 'slide' | 'scale';
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  location,
  mode = 'fade'
}) => {
  const getVariants = () => {
    switch (mode) {
      case 'slide':
        return {
          initial: { x: 15, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: -15, opacity: 0 }
        };
      case 'scale':
        return {
          initial: { scale: 0.95, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 1.05, opacity: 0 }
        };
      case 'fade':
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 }
        };
    }
  };

  return (
    <motion.div
      key={location}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={getVariants()}
      transition={{
        duration: 0.3,
        ease: "easeOut" // Changed from potential "ease-out" to "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
};
