
import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useTimeline } from './useTimeline';
import { cn } from '@/lib/utils';

const emotions = [
  { id: 'joy', label: 'Joy', color: 'bg-amber-100 text-amber-900 hover:bg-amber-200 border-amber-200' },
  { id: 'nostalgia', label: 'Nostalgia', color: 'bg-blue-100 text-blue-900 hover:bg-blue-200 border-blue-200' },
  { id: 'reverence', label: 'Reverence', color: 'bg-purple-100 text-purple-900 hover:bg-purple-200 border-purple-200' },
  { id: 'excitement', label: 'Excitement', color: 'bg-green-100 text-green-900 hover:bg-green-200 border-green-200' },
  { id: 'sadness', label: 'Sadness', color: 'bg-slate-100 text-slate-900 hover:bg-slate-200 border-slate-200' },
];

interface EmotionFilterBadgesProps {
  className?: string;
}

export const EmotionFilterBadges = ({ className }: EmotionFilterBadgesProps) => {
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const { setEmotionFilters } = useTimeline();
  
  const toggleEmotion = (emotionId: string) => {
    const newSelected = selectedEmotions.includes(emotionId)
      ? selectedEmotions.filter(id => id !== emotionId)
      : [...selectedEmotions, emotionId];
    
    setSelectedEmotions(newSelected);
    setEmotionFilters(newSelected);
  };

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <span className="text-sm text-muted-foreground self-center mr-2">Filter by emotion:</span>
      {emotions.map((emotion) => (
        <motion.div
          key={emotion.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Badge
            variant="outline"
            className={cn(
              "cursor-pointer transition-all px-3 py-1 text-sm",
              emotion.color,
              selectedEmotions.includes(emotion.id) 
                ? "ring-2 ring-offset-1" 
                : "opacity-70"
            )}
            onClick={() => toggleEmotion(emotion.id)}
          >
            {emotion.label}
          </Badge>
        </motion.div>
      ))}
    </div>
  );
};
