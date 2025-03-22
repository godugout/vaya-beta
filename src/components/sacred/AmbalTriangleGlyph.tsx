
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tooltip } from '@/components/ui/tooltip';
import { TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface AmbalTriangleGlyphProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  interactive?: boolean;
}

export const AmbalTriangleGlyph: React.FC<AmbalTriangleGlyphProps> = ({
  size = 'md',
  className = '',
  interactive = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Define sizes
  const sizeMap = {
    sm: { width: 40, height: 36, strokeWidth: 1.5 },
    md: { width: 60, height: 54, strokeWidth: 2 },
    lg: { width: 80, height: 72, strokeWidth: 2.5 },
    xl: { width: 120, height: 108, strokeWidth: 3 },
  };
  
  const { width, height, strokeWidth } = sizeMap[size];
  
  // Animation for the three horizontal lines
  const lineVariants = {
    initial: { pathLength: 0.8, opacity: 0.6 },
    animate: (i: number) => ({
      pathLength: [0.8, 1, 0.8],
      opacity: [0.6, 1, 0.6],
      transition: {
        pathLength: { 
          repeat: Infinity, 
          duration: 3, 
          ease: "easeInOut",
          delay: i * 0.4, // Stagger the animations
        },
        opacity: { 
          repeat: Infinity, 
          duration: 3, 
          ease: "easeInOut",
          delay: i * 0.4,
        }
      }
    })
  };
  
  // Labels for the three levels
  const lineLabels = [
    "Devotion to Hanuman (spiritual connection)",
    "Connection to Universe & Family (cosmic relationships)",
    "Grounding & Selfless Service (earthly purpose)"
  ];
  
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  
  const renderGlyph = () => (
    <svg 
      width={width} 
      height={height} 
      viewBox={`0 0 120 108`} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Triangle outline */}
      <motion.path 
        d="M60 10L110 98H10L60 10Z"
        stroke="currentColor" 
        strokeWidth={strokeWidth * 1.2}
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      
      {/* Three horizontal lines */}
      <motion.line 
        x1="30" y1="40" x2="90" y2="40" 
        stroke="currentColor" 
        strokeWidth={strokeWidth}
        custom={0}
        variants={lineVariants}
        initial="initial"
        animate="animate"
      />
      
      <motion.line 
        x1="25" y1="60" x2="95" y2="60" 
        stroke="currentColor" 
        strokeWidth={strokeWidth}
        custom={1}
        variants={lineVariants}
        initial="initial"
        animate="animate"
      />
      
      <motion.line 
        x1="20" y1="80" x2="100" y2="80" 
        stroke="currentColor" 
        strokeWidth={strokeWidth}
        custom={2}
        variants={lineVariants}
        initial="initial"
        animate="animate"
      />
    </svg>
  );
  
  if (interactive) {
    return (
      <TooltipProvider>
        {lineLabels.map((label, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <div 
                className="inline-block cursor-pointer" 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {renderGlyph()}
                <div className="absolute inset-0 pointer-events-none" style={{
                  top: index === 0 ? '30%' : index === 1 ? '50%' : '70%',
                  height: '20%'
                }}></div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    );
  }
  
  return renderGlyph();
};
