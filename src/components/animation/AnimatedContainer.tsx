
import React, { useState, useEffect } from 'react';
import { motion, MotionProps, Variants } from 'framer-motion';
import { useAnimation } from './AnimationProvider';
import { cn } from '@/lib/utils';

export type AnimationVariant = 
  | 'fade'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'scale'
  | 'pulse'
  | 'bounce'
  | 'none';

interface AnimatedContainerProps {
  children: React.ReactNode;
  variant?: AnimationVariant;
  isAnimating?: boolean;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  from?: Record<string, any>;
  to?: Record<string, any>;
  as?: React.ElementType;
  whileHover?: Record<string, any> | undefined;
  whileTap?: Record<string, any> | undefined;
}

export const AnimatedContainer: React.FC<AnimatedContainerProps & Omit<MotionProps, keyof AnimatedContainerProps>> = ({
  children,
  variant = 'fade',
  isAnimating = true,
  delay = 0,
  duration,
  className,
  once = false,
  from,
  to,
  as = 'div',
  whileHover,
  whileTap,
  ...motionProps
}) => {
  const { isReduced, duration: durationPresets, easing } = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Standard variants
  const variantPresets: Record<AnimationVariant, Variants> = {
    'fade': {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    'slide-up': {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    },
    'slide-down': {
      hidden: { opacity: 0, y: -20 },
      visible: { opacity: 1, y: 0 }
    },
    'slide-left': {
      hidden: { opacity: 0, x: 20 },
      visible: { opacity: 1, x: 0 }
    },
    'slide-right': {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 }
    },
    'scale': {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 }
    },
    'pulse': {
      hidden: { scale: 1 },
      visible: { 
        scale: [1, 1.05, 1],
        transition: { repeat: Infinity, repeatType: "mirror", duration: 2 }
      }
    },
    'bounce': {
      hidden: { y: 0 },
      visible: { 
        y: [0, -10, 0],
        transition: { repeat: Infinity, repeatType: "mirror", duration: 1.5 }
      }
    },
    'none': {
      hidden: {},
      visible: {}
    }
  };

  // Custom variants if provided
  const customVariants = from || to ? {
    hidden: from ?? {},
    visible: to ?? {}
  } : undefined;

  // Determine which variants to use
  const variants = customVariants || variantPresets[variant];

  // Set initial animation state
  useEffect(() => {
    if (once && hasAnimated) return;
    
    if (isAnimating) {
      setHasAnimated(true);
    }
  }, [isAnimating, once, hasAnimated]);

  // Skip animations if reduced motion is preferred
  if (isReduced && variant !== 'none') {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  // For continuous animations like pulse or bounce
  const isContinuous = ['pulse', 'bounce'].includes(variant);

  return (
    <motion.div
      as={as}
      className={cn(className)}
      initial="hidden"
      animate={isAnimating || hasAnimated ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration: duration || durationPresets.standard / 1000,
        delay: delay,
        ease: isContinuous ? "linear" : easing.standard
      }}
      whileHover={whileHover}
      whileTap={whileTap}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};
