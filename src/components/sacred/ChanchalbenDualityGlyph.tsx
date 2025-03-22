
import React from 'react';
import { motion } from 'framer-motion';

interface ChanchalbenDualityGlyphProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const ChanchalbenDualityGlyph: React.FC<ChanchalbenDualityGlyphProps> = ({
  size = 'md',
  className = '',
}) => {
  // Define sizes
  const sizeMap = {
    sm: { width: 44, height: 40, strokeWidth: 1.5 },
    md: { width: 66, height: 60, strokeWidth: 2 },
    lg: { width: 88, height: 80, strokeWidth: 2.5 },
    xl: { width: 132, height: 120, strokeWidth: 3 },
  };
  
  const { width, height, strokeWidth } = sizeMap[size];
  
  // Animation variants
  const containerVariants = {
    initial: { scale: 1 },
    animate: { 
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  const rightPathVariants = {
    initial: { pathLength: 0, opacity: 0.7 },
    animate: { 
      pathLength: 1, 
      opacity: [0.7, 1, 0.7],
      transition: {
        pathLength: { duration: 2, ease: "easeInOut" },
        opacity: { 
          duration: 3, 
          repeat: Infinity,
          ease: "easeInOut" 
        }
      }
    }
  };
  
  const leftPathVariants = {
    initial: { pathLength: 0, opacity: 0.7 },
    animate: { 
      pathLength: 1, 
      opacity: [0.7, 1, 0.7],
      transition: {
        pathLength: { duration: 2, ease: "easeInOut" },
        opacity: { 
          duration: 3, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5 // Offset to create counterpoint
        }
      }
    }
  };
  
  const centerPathVariants = {
    initial: { pathLength: 0 },
    animate: { 
      pathLength: 1,
      transition: { duration: 1.5, ease: "easeOut" }
    }
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className={className}
    >
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 132 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Rounded rectangle container */}
        <rect 
          x={strokeWidth} 
          y={strokeWidth} 
          width={132 - (strokeWidth * 2)} 
          height={120 - (strokeWidth * 2)} 
          rx="12" 
          stroke="currentColor" 
          strokeWidth={strokeWidth} 
          fill="none" 
        />
        
        {/* Right flowing path */}
        <motion.path
          d="M40 30C60 30 70 50 90 50C110 50 110 70 90 70C70 70 60 90 40 90"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          variants={rightPathVariants}
          initial="initial"
          animate="animate"
        />
        
        {/* Center path */}
        <motion.line
          x1="66" 
          y1="20" 
          x2="66" 
          y2="100"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          variants={centerPathVariants}
          initial="initial"
          animate="animate"
        />
        
        {/* Left flowing path */}
        <motion.path
          d="M92 30C72 30 62 50 42 50C22 50 22 70 42 70C62 70 72 90 92 90"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          variants={leftPathVariants}
          initial="initial"
          animate="animate"
        />
      </svg>
    </motion.div>
  );
};
