
import React, { Children } from 'react';
import { motion } from 'framer-motion';
import { useAnimation } from './AnimationProvider';
import { cn } from '@/lib/utils';

interface StaggeredContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'scale';
  duration?: number;
  containerDelay?: number;
}

export const StaggeredContainer: React.FC<StaggeredContainerProps> = ({
  children,
  className,
  staggerDelay = 0.1,
  animation = 'fade',
  duration,
  containerDelay = 0,
}) => {
  const { isReduced, duration: durationPresets } = useAnimation();
  const childArray = Children.toArray(children);

  // Skip animation if reduced motion is preferred
  if (isReduced) {
    return <div className={className}>{children}</div>;
  }

  // Define animation variants based on the animation prop
  const getVariants = () => {
    const variants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: containerDelay,
        },
      },
    };

    // Child animation variants
    const itemVariants = {
      fade: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      },
      'slide-up': {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      },
      'slide-down': {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
      },
      scale: {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
      },
    };

    return {
      container: variants,
      item: itemVariants[animation],
    };
  };

  const { container: containerVariants, item: itemVariants } = getVariants();

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {childArray.map((child, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          transition={{
            duration: duration || durationPresets.standard / 1000,
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};
