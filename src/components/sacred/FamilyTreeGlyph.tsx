
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FamilyTreeGlyphProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const FamilyTreeGlyph = ({
  className,
  size = 'md',
}: FamilyTreeGlyphProps) => {
  const sizeMap = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48',
  };
  
  // Growth animation variants
  const growVariants = {
    initial: {
      scaleY: 0.8,
      opacity: 0.8,
      transformOrigin: "bottom"
    },
    animate: {
      scaleY: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    }
  };
  
  // Leaf animation for a subtle wave
  const leafVariants = {
    animate: (i: number) => ({
      rotate: [0, i % 2 === 0 ? 2 : -2, 0],
      transition: {
        delay: i * 0.2,
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    })
  };

  return (
    <div className={cn('relative', sizeMap[size], className)}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Ancestral roots (two dots) */}
        <circle cx="40" cy="85" r="3" fill="#2ECC71" />
        <circle cx="60" cy="85" r="3" fill="#2ECC71" />
        
        {/* Trunk */}
        <motion.path
          d="M50,85 L50,35"
          fill="none"
          stroke="#2ECC71"
          strokeWidth="4"
          strokeLinecap="round"
          variants={growVariants}
          initial="initial"
          animate="animate"
        />
        
        {/* Two main branches */}
        <motion.path
          d="M50,35 L30,25 M50,35 L70,25"
          fill="none"
          stroke="#2ECC71"
          strokeWidth="3"
          strokeLinecap="round"
          variants={growVariants}
          initial="initial"
          animate="animate"
        />
        
        {/* Banana-leaf-like foliage (4 sets) */}
        <motion.path
          d="M30,25 C20,20 20,15 25,10"
          fill="none"
          stroke="#2ECC71"
          strokeWidth="3"
          strokeLinecap="round"
          custom={0}
          variants={leafVariants}
          animate="animate"
        />
        
        <motion.path
          d="M70,25 C80,20 80,15 75,10"
          fill="none"
          stroke="#2ECC71"
          strokeWidth="3"
          strokeLinecap="round"
          custom={1}
          variants={leafVariants}
          animate="animate"
        />
        
        <motion.path
          d="M40,30 C30,25 30,20 35,15"
          fill="none"
          stroke="#2ECC71"
          strokeWidth="3"
          strokeLinecap="round"
          custom={2}
          variants={leafVariants}
          animate="animate"
        />
        
        <motion.path
          d="M60,30 C70,25 70,20 65,15"
          fill="none"
          stroke="#2ECC71"
          strokeWidth="3"
          strokeLinecap="round"
          custom={3}
          variants={leafVariants}
          animate="animate"
        />
      </svg>
    </div>
  );
};
