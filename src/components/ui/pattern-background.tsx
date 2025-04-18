
import React from 'react';
import { cn } from '@/lib/utils';

type PatternType = 'dots' | 'grid' | 'sanskrit' | 'circles' | 'lines' | 'waves';
type PatternSize = 'sm' | 'md' | 'lg';
type PatternOpacity = 'light' | 'medium' | 'dark';

interface PatternBackgroundProps {
  pattern?: PatternType;
  size?: PatternSize;
  opacity?: PatternOpacity;
  className?: string;
  children?: React.ReactNode;
}

export const PatternBackground: React.FC<PatternBackgroundProps> = ({
  pattern = 'sanskrit',
  size = 'md',
  opacity = 'light',
  className,
  children
}) => {
  const getPatternClass = () => {
    const baseClass = "absolute inset-0 -z-10 pointer-events-none";
    
    const opacityClass = {
      light: "opacity-[0.03]",
      medium: "opacity-[0.05]",
      dark: "opacity-[0.08]"
    }[opacity];
    
    const patternClass = {
      dots: "bg-pattern-dots bg-[length:20px_20px]",
      grid: "bg-pattern-grid bg-[length:40px_40px]",
      sanskrit: "bg-pattern-sanskrit bg-repeat",
      circles: "bg-pattern-circles bg-repeat",
      lines: "bg-pattern-lines bg-repeat",
      waves: "bg-pattern-waves bg-repeat",
    }[pattern];
    
    const sizeClass = {
      sm: "bg-[length:100px_100px]",
      md: "bg-[length:200px_200px]",
      lg: "bg-[length:300px_300px]"
    }[size];
    
    return cn(baseClass, patternClass, sizeClass, opacityClass);
  };

  return (
    <div className={cn("relative", className)}>
      <div className={getPatternClass()} />
      {children}
    </div>
  );
};
