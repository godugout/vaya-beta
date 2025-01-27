import { useState, useEffect } from "react";
import { StoryMemory } from "./types";
import { Calendar, Play, Pause } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StoryMemoryCardProps {
  memory: StoryMemory;
}

export const StoryMemoryCard = ({ memory }: StoryMemoryCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioElement = new Audio(memory.content_url);
    setAudio(audioElement);
    return () => {
      audioElement.pause();
    };
  }, [memory.content_url]);

  const handlePlayPause = () => {
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Card className="bg-white border-vaya-purple/10 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="flex-grow">
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
              <Calendar className="w-4 h-4" />
              {format(new Date(memory.created_at), "MMM d, yyyy")}
            </div>
            <h3 className="text-gray-900 font-semibold mb-2">
              {memory.title || "Untitled Story"}
            </h3>
            <Button
              variant="outline"
              size="sm"
              className="bg-vaya-purple-light hover:bg-vaya-purple-light/80 border-none text-vaya-purple"
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              <span className="ml-2">
                {isPlaying ? "Pause" : "Play"}
              </span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};