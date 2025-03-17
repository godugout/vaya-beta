
import React from 'react';
import { Annotation } from './types';

interface AnnotationTooltipProps {
  annotation: Annotation;
}

export const AnnotationTooltip = ({ annotation }: AnnotationTooltipProps) => {
  return (
    <div 
      className="absolute bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg z-30 max-w-xs"
      style={{ 
        left: `${annotation.x * 100}%`, 
        top: `${annotation.y * 100}% + 20px`,
        transform: 'translateX(-50%)',
        marginTop: '20px'
      }}
    >
      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
        {annotation.type.charAt(0).toUpperCase() + annotation.type.slice(1)}
      </div>
      <div className="text-sm">{annotation.text}</div>
    </div>
  );
};
