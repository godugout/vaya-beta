
import React from 'react';
import { motion } from 'framer-motion';

interface JamnabenCircularGlyphProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const JamnabenCircularGlyph: React.FC<JamnabenCircularGlyphProps> = ({
  size = 'md',
  className = '',
}) => {
  // Define sizes
  const sizeMap = {
    sm: { width: 48, height: 48, strokeWidth: 1.5 },
    md: { width: 72, height: 72, strokeWidth: 2 },
    lg: { width: 96, height: 96, strokeWidth: 2.5 },
    xl: { width: 144, height: 144, strokeWidth: 3 },
  };
  
  const { width, height, strokeWidth } = sizeMap[size];
  
  // Animation for gentle glow
  const glowVariants = {
    initial: { opacity: 0.2 },
    animate: { 
      opacity: [0.2, 0.5, 0.2],
      transition: { 
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  return (
    <div className={`relative inline-block ${className}`}>
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 144 144" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Center glow */}
        <motion.circle
          cx="72"
          cy="72"
          r="40"
          fill="currentColor"
          fillOpacity="0.1"
          variants={glowVariants}
          initial="initial"
          animate="animate"
        />
        
        {/* Circular trunk forming circumference */}
        <motion.circle
          cx="72"
          cy="72"
          r="54"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {/* Trunk continuing upward */}
        <motion.path
          d="M72 18V72"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        
        {/* Bottom branches (longest) */}
        <motion.path
          d="M72 42 L52 34 M72 42 L92 34"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        />
        
        {/* Middle branches */}
        <motion.path
          d="M72 36 L57 30 M72 36 L87 30"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
        />
        
        {/* Top branches (shortest) */}
        <motion.path
          d="M72 30 L62 26 M72 30 L82 26"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
};
