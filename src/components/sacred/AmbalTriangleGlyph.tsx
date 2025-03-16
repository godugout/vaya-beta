
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
      filter: ["drop-shadow(0 0 1px rgba(255, 122, 0, 0.3))", "drop-shadow(0 0 3px rgba(255, 122, 0, 0.5))", "drop-shadow(0 0 1px rgba(255, 122, 0, 0.3))"],
      transition: {
        delay: i * 0.4,
        duration: 1.2,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    }),
  };
  
  // Cosmic triangle fill animation
  const triangleFillVariants = {
    animate: {
      opacity: [0.05, 0.15, 0.05],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const,
      }
    }
  };

  return (
    <motion.div 
      className={cn(
        'relative cursor-pointer', 
        sizeMap[size],
        className
      )}
      onClick={() => interactive && setShowLabels(!showLabels)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Triangle container */}
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Nebula fill inside triangle */}
        <motion.path
          d="M10,80 L50,20 L90,80 Z"
          fill="url(#triangleGradient)"
          variants={triangleFillVariants}
          animate="animate"
          opacity={0.1}
        />
        
        {/* Define gradients */}
        <defs>
          <radialGradient id="triangleGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#FF7A00" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Triangle with glow effect */}
        <motion.path
          d="M10,80 L50,20 L90,80 Z"
          fill="none"
          stroke="#FF7A00"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ 
            pathLength: 1,
            filter: ["drop-shadow(0 0 3px rgba(255, 122, 0, 0.3))", "drop-shadow(0 0 6px rgba(255, 122, 0, 0.6))", "drop-shadow(0 0 3px rgba(255, 122, 0, 0.3))"]
          }}
          transition={{ 
            pathLength: { duration: 1.5 },
            filter: { duration: 3, repeat: Infinity, repeatType: "reverse" }
          }}
        />

        {/* Three horizontal lines with glow */}
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
        
        {/* Add some small random stars within the triangle */}
        {[...Array(15)].map((_, index) => {
          // Generate random points within the triangle using barycentric coordinates
          const a = Math.random();
          const b = Math.random() * (1 - a);
          const c = 1 - a - b;
          
          const x = a * 10 + b * 50 + c * 90;
          const y = a * 80 + b * 20 + c * 80;
          const size = Math.random() * 0.8 + 0.2;
          
          return (
            <motion.circle
              key={`star-${index}`}
              cx={x} cy={y} r={size}
              fill="#FFFFFF"
              opacity={Math.random() * 0.5 + 0.2}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.3, 1]
              }}
              transition={{
                duration: 1.5 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          );
        })}
      </svg>

      {/* Labels with cosmic styling */}
      <AnimatePresence>
        {showLabels && (
          <div className="absolute left-full ml-2 top-0 text-left">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-3 bg-black/60 backdrop-blur-md p-3 rounded-lg border border-white/10"
            >
              <div className="text-xs md:text-sm">
                <p className="font-semibold text-amber-500">Devotion to Hanuman</p>
                <p className="text-xs text-gray-400">Spiritual connection</p>
              </div>
              <div className="text-xs md:text-sm">
                <p className="font-semibold text-amber-500">Connection to Universe & Family</p>
                <p className="text-xs text-gray-400">Cosmic relationships</p>
              </div>
              <div className="text-xs md:text-sm">
                <p className="font-semibold text-amber-500">Grounding & Selfless Service</p>
                <p className="text-xs text-gray-400">Earthly purpose</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
