
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationTransitionWrapperProps {
  children: React.ReactNode;
  locationKey: string;
  transitionType?: 'sacred' | 'standard' | 'none';
}

export const NavigationTransitionWrapper: React.FC<NavigationTransitionWrapperProps> = ({
  children,
  locationKey,
  transitionType = 'standard'
}) => {
  if (transitionType === 'none') {
    return <>{children}</>;
  }

  const variants = {
    sacred: {
      initial: { opacity: 0, scale: 0.96 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.04 },
    },
    standard: {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 },
    }
  };

  const transition = {
    duration: transitionType === 'sacred' ? 0.5 : 0.3,
    ease: "easeInOut", // Changed from "ease-in-out" to "easeInOut"
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={locationKey}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants[transitionType]}
        transition={transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
