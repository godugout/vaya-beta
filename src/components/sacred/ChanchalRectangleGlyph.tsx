
import React from 'react';
import { cn } from '@/lib/utils';

type GlyphSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ChanchalRectangleGlyphProps {
  size?: GlyphSize;
  className?: string;
  animated?: boolean;
}

export const ChanchalRectangleGlyph: React.FC<ChanchalRectangleGlyphProps> = ({
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
      {/* Outer Rectangle */}
      <rect 
        x="10" 
        y="15" 
        width="80" 
        height="70" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
        className="opacity-80"
      />
      
      {/* Middle Rectangle */}
      <rect 
        x="20" 
        y="25" 
        width="60" 
        height="50" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5"
        className="opacity-60"
      />
      
      {/* Inner Rectangle */}
      <rect 
        x="30" 
        y="35" 
        width="40" 
        height="30" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1"
        className="opacity-40"
      />
      
      {/* Four primary dots at corners of outer rectangle */}
      <circle cx="10" cy="15" r="3" fill="currentColor" />
      <circle cx="90" cy="15" r="3" fill="currentColor" />
      <circle cx="90" cy="85" r="3" fill="currentColor" />
      <circle cx="10" cy="85" r="3" fill="currentColor" />
      
      {/* Path elements representing winding roads or rivers */}
      <path 
        d="M25,65 C35,55 45,75 55,65 C65,55 75,75 85,65" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5"
        className="opacity-60"
      />
      
      <path 
        d="M15,45 C25,35 35,55 45,45 C55,35 65,55 75,45" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5"
        className="opacity-60"
      />
      
      {/* Center Point */}
      <circle cx="50" cy="50" r="4" fill="currentColor" />
    </svg>
  );
};
