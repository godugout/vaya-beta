
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ChanchalbenDualityGlyphProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const ChanchalbenDualityGlyph = ({
  className,
  size = 'md',
}: ChanchalbenDualityGlyphProps) => {
  const sizeMap = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48',
  };
  
  // Animation for the glyph scaling
  const containerVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  // Flow animation for the paths
  const flowVariants = {
    right: {
      pathOffset: [0, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }
    },
    left: {
      pathOffset: [0, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear",
        direction: "reverse" as const
      }
    }
  };

  return (
    <motion.div 
      className={cn(
        'relative', 
        sizeMap[size],
        className
      )}
      variants={containerVariants}
      animate="animate"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Container rounded rectangle */}
        <rect
          x="10" y="20" width="80" height="60"
          rx="10" ry="10"
          fill="none"
          stroke="#1E9C95"
          strokeWidth="3"
        />
        
        {/* Center straight path */}
        <line
          x1="50" y1="20" x2="50" y2="80"
          stroke="#1E9C95"
          strokeWidth="2"
        />
        
        {/* Right curving path */}
        <motion.path
          d="M50,20 C70,30 70,70 50,80"
          fill="none"
          stroke="#1E9C95"
          strokeWidth="2"
          variants={flowVariants}
          animate="right"
        />
        
        {/* Left curving path */}
        <motion.path
          d="M50,20 C30,30 30,70 50,80"
          fill="none"
          stroke="#1E9C95"
          strokeWidth="2"
          variants={flowVariants}
          animate="left"
        />
      </svg>
    </motion.div>
  );
};
