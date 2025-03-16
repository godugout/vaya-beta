
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
      filter: ["drop-shadow(0 0 5px rgba(242, 153, 45, 0.3))", "drop-shadow(0 0 10px rgba(242, 153, 45, 0.5))", "drop-shadow(0 0 5px rgba(242, 153, 45, 0.3))"],
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
      opacity: [0.7, 1, 0.7],
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
        {/* Glowing outer circle */}
        <circle
          cx="50" cy="50" r="40"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="3"
          className="cosmic-glow"
        />
        
        {/* Glowing inner circle */}
        <circle
          cx="50" cy="50" r="25"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="2"
        />
        
        {/* Glowing center circle */}
        <circle
          cx="50" cy="50" r="10"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="2"
        />
        
        {/* Stars/nebula background effect inside the main circle */}
        <circle
          cx="50" cy="50" r="38"
          fill="url(#cosmicGradient)"
          opacity="0.1"
        />
        
        {/* Define gradients */}
        <defs>
          <radialGradient id="cosmicGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>
        
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
              className="cosmic-glow"
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
        
        {/* Add some small random stars within the circle */}
        {[...Array(20)].map((_, index) => {
          const randomRadius = Math.random() * 35;
          const angle = Math.random() * 360 * (Math.PI / 180);
          const x = 50 + randomRadius * Math.cos(angle);
          const y = 50 + randomRadius * Math.sin(angle);
          const size = Math.random() * 0.8 + 0.3;
          
          return (
            <motion.circle
              key={`star-${index}`}
              cx={x} cy={y} r={size}
              fill="#FFFFFF"
              opacity={Math.random() * 0.5 + 0.3}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          );
        })}
      </svg>
    </motion.div>
  );
};
