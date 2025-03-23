
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { useState, useRef } from "react";
import { Memory } from "./types";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface StoryMemoryCardProps {
  memory: Memory;
  isPlaceholder?: boolean;
}

export const StoryMemoryCard = ({ memory, isPlaceholder = true }: StoryMemoryCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayback = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(memory.content_url);
      audioRef.current.onended = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Link to={`/memory/${memory.id}`}>
      <Card className={`hanuman-card hover:shadow-md transition-shadow duration-200 relative ${isPlaceholder ? 'opacity-90' : ''}`}>
        {isPlaceholder && (
          <Badge 
            variant="outline" 
            className="absolute top-2 right-2 bg-hanuman-primary/5 text-hanuman-text-secondary text-xs border-hanuman-border-color"
          >
            Demo
          </Badge>
        )}
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-hanuman-text-primary">Audio Memory</h3>
            <p className="text-sm text-hanuman-text-secondary">
              {new Date(memory.created_at).toLocaleDateString()}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <Button
            onClick={(e) => {
              e.preventDefault();
              togglePlayback();
            }}
            variant="outline"
            className="w-full border-hanuman-border-color text-hanuman-primary hover:bg-hanuman-primary/10"
          >
            {isPlaying ? (
              <Pause className="mr-2 h-4 w-4" />
            ) : (
              <Play className="mr-2 h-4 w-4" />
            )}
            {isPlaying ? "Pause" : "Play"} Story
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};
