
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import { TimelineItem } from "./types";
import { 
  BookOpen, 
  Image, 
  FileText, 
  Music, 
  Package,
  Clock,
  Calendar,
  Tag as TagIcon
} from "lucide-react";

interface TimelineItemCardProps {
  item: TimelineItem;
  compact?: boolean;
}

export const TimelineItemCard = ({ item, compact = false }: TimelineItemCardProps) => {
  const getIcon = () => {
    switch (item.type) {
      case 'story':
        return <BookOpen className="h-4 w-4 text-blue-500" />;
      case 'photo':
        return <Image className="h-4 w-4 text-green-500" />;
      case 'memory':
        return <FileText className="h-4 w-4 text-amber-500" />;
      case 'audio':
        return <Music className="h-4 w-4 text-purple-500" />;
      case 'capsule':
        return <Package className="h-4 w-4 text-pink-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getItemUrl = () => {
    switch (item.type) {
      case 'story':
        return `/story/${item.id}`;
      case 'memory':
        return `/memory/${item.id}`;
      case 'photo':
        return `/photo/${item.id}`;
      case 'capsule':
        return `/capsule/${item.id}`;
      default:
        return `/${item.type}/${item.id}`;
    }
  };
  
  const getFormattedDate = () => {
    try {
      return format(parseISO(item.date), "MMM d, yyyy");
    } catch (e) {
      return "Unknown date";
    }
  };
  
  const getContentTypeLabel = () => {
    switch (item.type) {
      case 'story':
        return 'Story';
      case 'photo':
        return 'Photo';
      case 'memory':
        return 'Memory';
      case 'audio':
        return 'Audio Recording';
      case 'capsule':
        return 'Memory Capsule';
      default:
        return item.type.charAt(0).toUpperCase() + item.type.slice(1);
    }
  };
  
  if (compact) {
    return (
      <Link to={getItemUrl()}>
        <Card className="hover:bg-accent hover:text-accent-foreground transition-colors">
          <CardContent className="p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              {getIcon()}
              <span className="font-medium truncate">{item.title}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {getFormattedDate()}
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={getItemUrl()}>
      <Card className="hover:bg-accent hover:text-accent-foreground transition-colors">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              {getIcon()}
              <span className="font-medium">{item.title}</span>
            </div>
            <Badge variant="outline">{getContentTypeLabel()}</Badge>
          </div>
          
          {item.description && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {item.description}
            </p>
          )}
          
          <div className="flex flex-wrap gap-2 items-center text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{getFormattedDate()}</span>
            </div>
            
            {item.tags && item.tags.length > 0 && (
              <div className="flex items-center gap-1">
                <TagIcon className="h-3 w-3" />
                <div className="flex gap-1">
                  {item.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag.id} variant="secondary" className="text-xs px-1 py-0">
                      {tag.tag}
                    </Badge>
                  ))}
                  {item.tags.length > 3 && (
                    <span>+{item.tags.length - 3}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
