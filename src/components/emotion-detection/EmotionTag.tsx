
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { EmotionTagProps, EmotionType } from './types';

const EMOTION_COLORS: Record<EmotionType, { bg: string; text: string; border: string }> = {
  'joy': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
  'sadness': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
  'nostalgia': { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300' },
  'excitement': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
  'reverence': { bg: 'bg-teal-100', text: 'text-teal-800', border: 'border-teal-300' }
};

const EMOTION_ICONS: Record<EmotionType, string> = {
  'joy': '😊',
  'sadness': '😢',
  'nostalgia': '🕰️',
  'excitement': '🎉',
  'reverence': '✨'
};

export const EmotionTag: React.FC<EmotionTagProps> = ({
  emotion,
  confidence,
  size = 'md',
  onClick,
  selected = false
}) => {
  const colors = EMOTION_COLORS[emotion];
  const icon = EMOTION_ICONS[emotion];
  
  const sizeClasses = {
    'sm': 'text-xs py-0.5 px-1.5',
    'md': 'text-sm py-1 px-2',
    'lg': 'text-base py-1.5 px-3'
  };
  
  // Format confidence as percentage
  const confidencePercent = `${Math.round(confidence * 100)}%`;
  
  return (
    <Badge
      variant="outline"
      className={cn(
        colors.bg, 
        colors.text, 
        colors.border,
        sizeClasses[size],
        'font-normal flex items-center gap-1 transition-all',
        selected && 'ring-2 ring-offset-1',
        onClick && 'cursor-pointer hover:opacity-80'
      )}
      onClick={onClick}
    >
      <span>{icon}</span>
      <span className="font-medium capitalize">{emotion}</span>
      <span className="opacity-70">({confidencePercent})</span>
    </Badge>
  );
};
