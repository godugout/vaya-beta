import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { useState, useRef } from "react";
import { Memory } from "./types";
import { Link } from "react-router-dom";

interface StoryMemoryCardProps {
  memory: Memory;
}

export const StoryMemoryCard = ({ memory }: StoryMemoryCardProps) => {
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
      <Card className="bg-white hover:shadow-md transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <h3 className="text-sm font-medium">Audio Memory</h3>
            <p className="text-sm text-gray-500">
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
            className="w-full border-vaya-secondary text-vaya-secondary hover:bg-vaya-secondary hover:text-white"
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