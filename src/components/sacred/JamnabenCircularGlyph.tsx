
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface JamnabenCircularGlyphProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const JamnabenCircularGlyph = ({
  className,
  size = 'md',
}: JamnabenCircularGlyphProps) => {
  const sizeMap = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48',
  };
  
  // Animation variants
  const circleVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  // Dot animation
  const dotVariants = {
    animate: (index: number) => ({
      scale: [1, 1.3, 1],
      transition: {
        delay: index * 0.2,
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  };

  return (
    <motion.div 
      className={cn(
        'relative', 
        sizeMap[size],
        className
      )}
      variants={circleVariants}
      animate="animate"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Outer circle */}
        <circle
          cx="50" cy="50" r="40"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="3"
        />
        
        {/* Inner circle */}
        <circle
          cx="50" cy="50" r="25"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="2"
        />
        
        {/* Center circle */}
        <circle
          cx="50" cy="50" r="10"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="2"
        />
        
        {/* Animated dots along the circles (12 positions) */}
        {[...Array(12)].map((_, index) => {
          const angle = (index * 30) * (Math.PI / 180);
          const x = 50 + 40 * Math.cos(angle);
          const y = 50 + 40 * Math.sin(angle);
          
          return (
            <motion.circle
              key={`outer-${index}`}
              cx={x} cy={y} r="2"
              fill="#F59E0B"
              custom={index}
              variants={dotVariants}
              animate="animate"
            />
          );
        })}
        
        {/* Middle circle dots (8 positions) */}
        {[...Array(8)].map((_, index) => {
          const angle = (index * 45) * (Math.PI / 180);
          const x = 50 + 25 * Math.cos(angle);
          const y = 50 + 25 * Math.sin(angle);
          
          return (
            <motion.circle
              key={`middle-${index}`}
              cx={x} cy={y} r="1.5"
              fill="#F59E0B"
              custom={index + 3} // Offset timing
              variants={dotVariants}
              animate="animate"
            />
          );
        })}
        
        {/* Inner circle dots (4 positions) */}
        {[...Array(4)].map((_, index) => {
          const angle = (index * 90) * (Math.PI / 180);
          const x = 50 + 10 * Math.cos(angle);
          const y = 50 + 10 * Math.sin(angle);
          
          return (
            <motion.circle
              key={`inner-${index}`}
              cx={x} cy={y} r="1"
              fill="#F59E0B"
              custom={index + 6} // Offset timing
              variants={dotVariants}
              animate="animate"
            />
          );
        })}
      </svg>
    </motion.div>
  );
};
