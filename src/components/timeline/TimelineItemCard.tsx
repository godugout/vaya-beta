
import { useState } from 'react';
import { TimelineItem } from './types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Calendar, Clock, Bookmark, Image, FileText, CalendarClock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TimelineItemCardProps {
  item: TimelineItem;
}

export const TimelineItemCard = ({ item }: TimelineItemCardProps) => {
  const [expanded, setExpanded] = useState(false);
  
  const typeIcon = {
    memory: <Image className="h-4 w-4" />,
    story: <FileText className="h-4 w-4" />,
    event: <Calendar className="h-4 w-4" />,
    photo: <Image className="h-4 w-4" />
  }[item.type];
  
  const emotionColors = {
    'joy': 'bg-amber-100 text-amber-800 border-amber-200',
    'sadness': 'bg-slate-100 text-slate-800 border-slate-200',
    'nostalgia': 'bg-blue-100 text-blue-800 border-blue-200',
    'excitement': 'bg-green-100 text-green-800 border-green-200',
    'reverence': 'bg-purple-100 text-purple-800 border-purple-200',
    'pride': 'bg-rose-100 text-rose-800 border-rose-200',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow bg-background/80 backdrop-blur-sm border-[1.5px]">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <Badge variant="outline" className="capitalize">
              <span className="flex items-center gap-1">
                {typeIcon}
                {item.type}
              </span>
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="pb-3">
          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarClock className="mr-2 h-4 w-4" />
              <span>{item.date.toLocaleDateString('en-US', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}</span>
            </div>
            
            <p className={cn(
              "text-sm text-muted-foreground mt-2 transition-all", 
              expanded ? "" : "line-clamp-2"
            )}>
              {item.content}
            </p>
            
            {item.image && (
              <div className="mt-3 overflow-hidden rounded-md">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="h-auto w-full object-cover transition-all hover:scale-105"
                />
              </div>
            )}
            
            {item.emotions && item.emotions.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {item.emotions.map(emotion => (
                  <Badge 
                    key={emotion} 
                    variant="outline"
                    className={cn(
                      "text-xs",
                      emotionColors[emotion as keyof typeof emotionColors] || 'bg-gray-100 text-gray-800'
                    )}
                  >
                    {emotion}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="pt-0">
          <button 
            className="text-xs text-muted-foreground hover:text-foreground"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
