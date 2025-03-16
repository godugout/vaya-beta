
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AmbalTriangleGlyphProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean;
}

export const AmbalTriangleGlyph = ({
  className,
  size = 'md',
  interactive = true,
}: AmbalTriangleGlyphProps) => {
  const [showLabels, setShowLabels] = useState(false);
  
  const sizeMap = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48',
  };

  // Animation variants for the lines
  const lineVariants = {
    animate: (i: number) => ({
      opacity: [0.6, 1, 0.6],
      transition: {
        delay: i * 0.4,
        duration: 1.2,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    }),
  };

  return (
    <motion.div 
      className={cn(
        'relative cursor-pointer', 
        sizeMap[size],
        className
      )}
      onClick={() => interactive && setShowLabels(!showLabels)}
    >
      {/* Triangle container */}
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Triangle */}
        <motion.path
          d="M10,80 L50,20 L90,80 Z"
          fill="none"
          stroke="#FF7A00"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Three horizontal lines */}
        <motion.line
          x1="20" y1="40" x2="80" y2="40"
          stroke="#FF7A00"
          strokeWidth="3"
          custom={0}
          variants={lineVariants}
          animate="animate"
        />
        <motion.line
          x1="20" y1="55" x2="80" y2="55"
          stroke="#FF7A00"
          strokeWidth="3"
          custom={1}
          variants={lineVariants}
          animate="animate"
        />
        <motion.line
          x1="20" y1="70" x2="80" y2="70"
          stroke="#FF7A00"
          strokeWidth="3"
          custom={2}
          variants={lineVariants}
          animate="animate"
        />
      </svg>

      {/* Labels */}
      <AnimatePresence>
        {showLabels && (
          <div className="absolute left-full ml-2 top-0 text-left">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              <div className="text-xs md:text-sm">
                <p className="font-semibold text-amber-500">Devotion to Hanuman</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Spiritual connection</p>
              </div>
              <div className="text-xs md:text-sm">
                <p className="font-semibold text-amber-500">Connection to Universe & Family</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Cosmic relationships</p>
              </div>
              <div className="text-xs md:text-sm">
                <p className="font-semibold text-amber-500">Grounding & Selfless Service</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Earthly purpose</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
