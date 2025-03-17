
import React from 'react';
import { Annotation } from './types';

interface AnnotationMarkerProps {
  annotation: Annotation;
  index: number;
  isActive: boolean;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
}

export const AnnotationMarker = ({
  annotation,
  index,
  isActive,
  onMouseEnter,
  onMouseLeave
}: AnnotationMarkerProps) => {
  return (
    <div 
      className={`absolute w-6 h-6 -ml-3 -mt-3 rounded-full border-2 flex items-center justify-center transition-all duration-300 cursor-pointer ${
        isActive
          ? 'bg-primary border-white scale-125 z-20'
          : 'bg-primary/60 border-white/80 hover:scale-110 z-10'
      }`}
      style={{ 
        left: `${annotation.x * 100}%`, 
        top: `${annotation.y * 100}%`
      }}
      onMouseEnter={() => onMouseEnter(annotation.id)}
      onMouseLeave={onMouseLeave}
    >
      <span className="text-xs text-white font-bold">
        {index + 1}
      </span>
    </div>
  );
};
