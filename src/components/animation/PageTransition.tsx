
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimation } from './AnimationProvider';

interface PageTransitionProps {
  children: React.ReactNode;
  location: string;
  mode?: 'fade' | 'slide' | 'scale' | 'none';
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  location,
  mode = 'fade',
}) => {
  const { isReduced, duration: durationPresets, easing } = useAnimation();

  // Skip animation if reduced motion is preferred or mode is none
  if (isReduced || mode === 'none') {
    return <>{children}</>;
  }

  // Define variants based on transition mode
  const getVariants = () => {
    switch (mode) {
      case 'slide':
        return {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -20 },
        };
      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 1.05 },
        };
      case 'fade':
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        };
    }
  };

  const variants = getVariants();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={{
          duration: durationPresets.standard / 1000,
          ease: easing.standard,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
