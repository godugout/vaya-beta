
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
  
  // Slow breathing animation for the glow
  const glowVariants = {
    animate: {
      opacity: [0.2, 0.6, 0.2],
      scale: [0.95, 1, 0.95],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className={cn('relative', sizeMap[size], className)}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Inner glow */}
        <motion.circle
          cx="50" cy="50" r="30"
          fill="#FFDD59"
          opacity="0.2"
          variants={glowVariants}
          animate="animate"
        />
        
        {/* Circular trunk forming circumference */}
        <circle
          cx="50" cy="50" r="40"
          fill="none"
          stroke="#FFDD59"
          strokeWidth="3"
        />
        
        {/* Trunk continuing upward */}
        <path
          d="M50,10 L50,30"
          fill="none"
          stroke="#FFDD59"
          strokeWidth="3"
        />
        
        {/* Bottom V-shaped branches (longest) */}
        <path
          d="M50,65 L35,80 M50,65 L65,80"
          fill="none"
          stroke="#FFDD59"
          strokeWidth="2.5"
        />
        
        {/* Middle V-shaped branches */}
        <path
          d="M50,50 L40,60 M50,50 L60,60"
          fill="none"
          stroke="#FFDD59"
          strokeWidth="2.5"
        />
        
        {/* Top V-shaped branches (shortest) */}
        <path
          d="M50,35 L45,45 M50,35 L55,45"
          fill="none"
          stroke="#FFDD59"
          strokeWidth="2.5"
        />
        
        {/* Silhouette of praying hands (negative space) */}
        <path
          d="M50,50 C45,60 40,65 50,75 C60,65 55,60 50,50 Z"
          fill="#FFDD59"
          opacity="0.2"
        />
      </svg>
    </div>
  );
};
