
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { EmotionType } from "./types";

interface EmotionColorMap {
  [key: string]: string;
}

const emotionColors: EmotionColorMap = {
  'joy': 'bg-amber-100 text-amber-900 border-amber-200',
  'nostalgia': 'bg-blue-100 text-blue-900 border-blue-200',
  'reverence': 'bg-purple-100 text-purple-900 border-purple-200',
  'excitement': 'bg-green-100 text-green-900 border-green-200',
  'sadness': 'bg-slate-100 text-slate-900 border-slate-200',
  'default': 'bg-gray-100 text-gray-900 border-gray-200'
};

interface TimelineEmotionBadgeProps {
  emotion: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

/**
 * A reusable emotion badge component for the timeline
 */
export const TimelineEmotionBadge = ({ 
  emotion, 
  className,
  size = 'md',
  interactive = false
}: TimelineEmotionBadgeProps) => {
  // Get color settings based on emotion type or use default
  const colorClass = emotionColors[emotion] || emotionColors.default;
  
  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium transition-all",
        colorClass,
        sizeClasses[size],
        interactive && "cursor-pointer hover:opacity-80",
        className
      )}
    >
      {/* Capitalize the first letter of the emotion */}
      {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
    </Badge>
  );
};
