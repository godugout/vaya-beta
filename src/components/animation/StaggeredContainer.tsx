
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useAnimation } from './AnimationProvider';

type AnimationType = 'fade' | 'slide' | 'scale';

interface StaggeredContainerProps {
  children: ReactNode;
  animation?: AnimationType;
  staggerDelay?: number;
  className?: string;
}

export const StaggeredContainer: React.FC<StaggeredContainerProps> = ({
  children,
  animation = 'fade',
  staggerDelay = 0.1,
  className = ''
}) => {
  const { isReduced } = useAnimation();
  
  if (isReduced) {
    return <div className={className}>{children}</div>;
  }
  
  // Define animation variants based on type
  const getAnimationVariants = () => {
    switch (animation) {
      case 'slide':
        return {
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0 }
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1 }
        };
      case 'fade':
      default:
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        };
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay
      }
    }
  };
  
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={getAnimationVariants()}
          transition={{ 
            duration: 0.5, 
            ease: [0.23, 1, 0.32, 1]
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};
