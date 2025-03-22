
import React from 'react';
import { cn } from '@/lib/utils';

type GlyphSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface JamnabenCircularGlyphProps {
  size?: GlyphSize;
  className?: string;
  animated?: boolean;
}

export const JamnabenCircularGlyph: React.FC<JamnabenCircularGlyphProps> = ({
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

  const animationClass = animated ? 'animate-spin-slow' : '';

  return (
    <svg 
      viewBox="0 0 100 100" 
      className={cn(sizeClasses[size], animationClass, className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Circle */}
      <circle 
        cx="50" 
        cy="50" 
        r="45" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
        className="opacity-80"
      />
      
      {/* Middle Circle */}
      <circle 
        cx="50" 
        cy="50" 
        r="35" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5"
        className="opacity-60"
      />
      
      {/* Inner Circle */}
      <circle 
        cx="50" 
        cy="50" 
        r="25" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1"
        className="opacity-40"
      />
      
      {/* Four primary dots */}
      <circle cx="50" cy="5" r="3" fill="currentColor" />
      <circle cx="95" cy="50" r="3" fill="currentColor" />
      <circle cx="50" cy="95" r="3" fill="currentColor" />
      <circle cx="5" cy="50" r="3" fill="currentColor" />
      
      {/* Eight secondary dots */}
      <circle cx="75" cy="15" r="2" fill="currentColor" className="opacity-80" />
      <circle cx="85" cy="25" r="2" fill="currentColor" className="opacity-80" />
      <circle cx="85" cy="75" r="2" fill="currentColor" className="opacity-80" />
      <circle cx="75" cy="85" r="2" fill="currentColor" className="opacity-80" />
      <circle cx="25" cy="85" r="2" fill="currentColor" className="opacity-80" />
      <circle cx="15" cy="75" r="2" fill="currentColor" className="opacity-80" />
      <circle cx="15" cy="25" r="2" fill="currentColor" className="opacity-80" />
      <circle cx="25" cy="15" r="2" fill="currentColor" className="opacity-80" />
      
      {/* Center Point */}
      <circle cx="50" cy="50" r="4" fill="currentColor" />
    </svg>
  );
};
