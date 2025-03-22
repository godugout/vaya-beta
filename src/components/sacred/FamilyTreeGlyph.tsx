
import React from 'react';
import { motion } from 'framer-motion';

interface FamilyTreeGlyphProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const FamilyTreeGlyph: React.FC<FamilyTreeGlyphProps> = ({
  size = 'md',
  className = '',
}) => {
  // Define sizes
  const sizeMap = {
    sm: { width: 48, height: 54, strokeWidth: 1.5 },
    md: { width: 72, height: 81, strokeWidth: 2 },
    lg: { width: 96, height: 108, strokeWidth: 2.5 },
    xl: { width: 144, height: 162, strokeWidth: 3 },
  };
  
  const { width, height, strokeWidth } = sizeMap[size];
  
  // Animation for growth effect
  const growVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        pathLength: { duration: 1.5, ease: "easeOut" },
        opacity: { duration: 0.5 }
      }
    }
  };
  
  // Animation for leaf growth
  const leafVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (custom: number) => ({ 
      scale: 1, 
      opacity: 1,
      transition: { 
        delay: 1 + (custom * 0.15),
        duration: 0.8, 
        ease: "easeOut"
      }
    })
  };
  
  // Animation for root dots
  const rootVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        delay: 0.8,
        duration: 0.5, 
        ease: "easeOut"
      }
    }
  };
  
  return (
    <div className={`relative inline-block ${className}`}>
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 144 162" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Central trunk */}
        <motion.path
          d="M72 150 L72 45"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          variants={growVariants}
          initial="initial"
          animate="animate"
        />
        
        {/* Main branches (left and right) */}
        <motion.path
          d="M72 60 L45 35"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          variants={growVariants}
          initial="initial"
          animate="animate"
        />
        
        <motion.path
          d="M72 60 L99 35"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          variants={growVariants}
          initial="initial"
          animate="animate"
        />
        
        {/* Four leaf foliage groups */}
        <motion.path
          d="M45 35 C35 25, 25 28, 20 35 C25 42, 35 45, 45 35"
          fill="currentColor"
          fillOpacity="0.9"
          variants={leafVariants}
          custom={0}
          initial="initial"
          animate="animate"
        />
        
        <motion.path
          d="M99 35 C109 25, 119 28, 124 35 C119 42, 109 45, 99 35"
          fill="currentColor"
          fillOpacity="0.9" 
          variants={leafVariants}
          custom={1}
          initial="initial"
          animate="animate"
        />
        
        <motion.path
          d="M72 45 C62 35, 52 38, 47 45 C52 52, 62 55, 72 45"
          fill="currentColor"
          fillOpacity="0.9"
          variants={leafVariants}
          custom={2}
          initial="initial"
          animate="animate"
        />
        
        <motion.path
          d="M72 45 C82 35, 92 38, 97 45 C92 52, 82 55, 72 45"
          fill="currentColor"
          fillOpacity="0.9"
          variants={leafVariants}
          custom={3}
          initial="initial"
          animate="animate"
        />
        
        {/* Root dots */}
        <motion.circle
          cx="65"
          cy="150"
          r="4"
          fill="currentColor"
          variants={rootVariants}
          initial="initial"
          animate="animate"
        />
        
        <motion.circle
          cx="79"
          cy="150"
          r="4"
          fill="currentColor"
          variants={rootVariants}
          initial="initial"
          animate="animate"
        />
      </svg>
    </div>
  );
};
