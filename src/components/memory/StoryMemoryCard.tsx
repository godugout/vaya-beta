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
    <Card className="bg-[#2A2A2A] border-[#3A3A3A] overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="flex-grow">
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
              <Calendar className="w-4 h-4" />
              {format(new Date(memory.created_at), "MMM d, yyyy")}
            </div>
            <h3 className="text-white font-semibold mb-2">
              {memory.title || "Untitled Story"}
            </h3>
            <Button
              variant="outline"
              size="sm"
              className="bg-[#3A3A3A] hover:bg-[#4A4A4A] border-none"
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-[#8B5CF6]" />
              ) : (
                <Play className="w-4 h-4 text-[#8B5CF6]" />
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