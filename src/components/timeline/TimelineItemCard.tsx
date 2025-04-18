
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TimelineItem } from "./types";
import { cn } from "@/lib/utils";
import { Calendar, Clock, FileText, Image, Mic, Package2 } from "lucide-react";
import { TimelineEmotionBadge } from "./TimelineEmotionBadge";

// Type icon mapping
const typeIcons = {
  memory: <FileText className="h-4 w-4" />,
  story: <FileText className="h-4 w-4" />,
  event: <Calendar className="h-4 w-4" />,
  photo: <Image className="h-4 w-4" />,
  audio: <Mic className="h-4 w-4" />,
  capsule: <Package2 className="h-4 w-4" />
};

// Type color mapping
const typeColors = {
  memory: "bg-blue-50 text-blue-700 border-blue-200",
  story: "bg-amber-50 text-amber-700 border-amber-200",
  event: "bg-green-50 text-green-700 border-green-200",
  photo: "bg-purple-50 text-purple-700 border-purple-200",
  audio: "bg-rose-50 text-rose-700 border-rose-200",
  capsule: "bg-teal-50 text-teal-700 border-teal-200"
};

interface TimelineItemCardProps {
  item: TimelineItem;
  className?: string;
}

export const TimelineItemCard = ({ item, className }: TimelineItemCardProps) => {
  // Format the date in a readable format
  const formatDate = (date: Date | string) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className={cn("overflow-hidden hover:shadow-md transition-all", className)}>
      {item.image && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge
            variant="outline"
            className={cn(
              "flex items-center gap-1 px-2 py-1",
              typeColors[item.type] || "bg-gray-50 text-gray-700"
            )}
          >
            {typeIcons[item.type]}
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </Badge>
          
          <div className="text-sm text-muted-foreground">
            {formatDate(item.date)}
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mt-2">
          {item.title}
        </h3>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">
          {item.content}
        </p>
      </CardContent>
      
      {item.emotions && item.emotions.length > 0 && (
        <CardFooter className="pt-0 flex flex-wrap gap-2">
          {item.emotions.slice(0, 3).map(emotion => (
            <TimelineEmotionBadge
              key={emotion}
              emotion={emotion}
              size="sm"
            />
          ))}
          {item.emotions.length > 3 && (
            <Badge variant="outline" className="bg-gray-50 text-gray-700 px-2 py-0.5 text-xs">
              +{item.emotions.length - 3} more
            </Badge>
          )}
        </CardFooter>
      )}
    </Card>
  );
};
