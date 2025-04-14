
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimation } from './AnimationProvider';

interface NavigationTransitionWrapperProps {
  children: React.ReactNode;
  locationKey: string;
  transitionType?: 'temple' | 'sacred' | 'vault' | 'standard';
}

export const NavigationTransitionWrapper: React.FC<NavigationTransitionWrapperProps> = ({
  children,
  locationKey,
  transitionType = 'standard'
}) => {
  const { isReduced, duration, easing } = useAnimation();
  
  // If reduced motion is preferred, just render the children without animation
  if (isReduced) {
    return <>{children}</>;
  }
  
  // Define variants based on the transition type
  const getVariants = () => {
    switch (transitionType) {
      case 'temple':
        return {
          initial: { 
            opacity: 0,
            scale: 0.97,
            filter: "brightness(0.8)"
          },
          animate: { 
            opacity: 1,
            scale: 1,
            filter: "brightness(1)"
          },
          exit: { 
            opacity: 0,
            scale: 1.03,
            filter: "brightness(1.2)"
          }
        };
      case 'sacred':
        return {
          initial: { 
            opacity: 0,
            y: 20,
            clipPath: "inset(5% 5% 5% 5% round 8px)"
          },
          animate: { 
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0% round 0px)"
          },
          exit: { 
            opacity: 0,
            y: -20,
            clipPath: "inset(5% 5% 5% 5% round 8px)"
          }
        };
      case 'vault':
        return {
          initial: { 
            opacity: 0,
            scale: 0.9,
            rotateY: -10
          },
          animate: { 
            opacity: 1,
            scale: 1,
            rotateY: 0
          },
          exit: { 
            opacity: 0,
            scale: 0.9,
            rotateY: 10
          }
        };
      case 'standard':
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 }
        };
    }
  };
  
  const variants = getVariants();
  
  // Custom transitions based on type
  const getTransition = () => {
    switch (transitionType) {
      case 'temple':
        return {
          duration: duration.slow / 1000,
          ease: easing.bounce
        };
      case 'sacred':
        return {
          duration: duration.standard / 1000,
          ease: easing.elastic
        };
      case 'vault':
        return {
          duration: duration.standard / 1000,
          ease: easing.bounce,
          staggerChildren: 0.1
        };
      case 'standard':
      default:
        return {
          duration: duration.standard / 1000,
          ease: easing.standard
        };
    }
  };
  
  const transition = getTransition();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={locationKey}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={transition}
        className={`navigation-transition ${transitionType}-transition`}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
