
import { VideoMemory } from "./types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Play, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

interface VideoMemoryCardProps {
  memory: VideoMemory;
  isPlaceholder?: boolean;
}

export const VideoMemoryCard = ({ memory, isPlaceholder = true }: VideoMemoryCardProps) => {
  return (
    <Link to={`/memory/${memory.id}`}>
      <Card className={`hanuman-card hover:shadow-md transition-shadow duration-200 relative ${isPlaceholder ? 'opacity-90' : ''}`}>
        {isPlaceholder && (
          <Badge 
            variant="outline" 
            className="absolute top-2 right-2 z-10 bg-hanuman-primary/5 text-hanuman-text-secondary text-xs border-hanuman-border-color"
          >
            Demo
          </Badge>
        )}
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-hanuman-text-primary">Video Memory</div>
              <div className="flex items-center text-xs text-hanuman-text-secondary">
                <Calendar className="h-3 w-3 mr-1" />
                {format(new Date(memory.created_at), "MMM d, yyyy")}
              </div>
            </div>
            
            <div className="relative aspect-video rounded-lg overflow-hidden bg-hanuman-dark/50">
              <img
                src={memory.video_url || memory.content_url}
                alt="Video thumbnail"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-12 w-12 rounded-full bg-hanuman-primary/20 hover:bg-hanuman-primary/40 text-white"
                  onClick={(e) => e.preventDefault()}
                >
                  <Play className="h-6 w-6" />
                </Button>
              </div>
            </div>
            
            {memory.caption && (
              <p className="text-hanuman-text-secondary text-sm">
                {memory.caption}
              </p>
            )}
            
            {memory.duration && (
              <div className="text-xs text-hanuman-text-secondary">
                Duration: {Math.floor(memory.duration / 60)}:{(memory.duration % 60).toString().padStart(2, '0')}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
