
import React from 'react';
import { cn } from '@/lib/utils';

type GlyphSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AmbaTriangleGlyphProps {
  size?: GlyphSize;
  className?: string;
  animated?: boolean;
}

export const AmbaTriangleGlyph: React.FC<AmbaTriangleGlyphProps> = ({
  size = 'md',
  className,
  animated = false
}) => {
  const sizeClasses: Record<GlyphSize, string> = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8', 
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const animationClass = animated ? 'animate-pulse' : '';

  return (
    <svg 
      viewBox="0 0 100 100" 
      className={cn(sizeClasses[size], animationClass, className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main Triangle */}
      <polygon 
        points="50,10 90,80 10,80" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
        className="opacity-80"
      />
      
      {/* Inner Triangle */}
      <polygon 
        points="50,30 75,70 25,70" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5"
        className="opacity-60"
      />
      
      {/* Smallest Triangle */}
      <polygon 
        points="50,45 65,65 35,65" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1"
        className="opacity-40"
      />
      
      {/* Three primary dots at vertices */}
      <circle cx="50" cy="10" r="3" fill="currentColor" />
      <circle cx="90" cy="80" r="3" fill="currentColor" />
      <circle cx="10" cy="80" r="3" fill="currentColor" />
      
      {/* Six secondary dots at middle points */}
      <circle cx="70" cy="45" r="2" fill="currentColor" className="opacity-80" />
      <circle cx="30" cy="45" r="2" fill="currentColor" className="opacity-80" />
      <circle cx="50" cy="80" r="2" fill="currentColor" className="opacity-80" />
      
      {/* Center Point */}
      <circle cx="50" cy="50" r="4" fill="currentColor" />
      
      {/* Tiger stripes - subtle design element */}
      <path 
        d="M40,55 Q50,50 60,55" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1"
        className="opacity-50"
      />
      <path 
        d="M35,60 Q50,55 65,60" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1"
        className="opacity-50"
      />
    </svg>
  );
};
