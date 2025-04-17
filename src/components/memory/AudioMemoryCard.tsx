
import MemoryCard from "./MemoryCard";
import { AudioMemory } from "./types";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Play, Pause } from "lucide-react";
import { useState, useRef } from "react";

interface AudioMemoryCardProps {
  memory: AudioMemory;
  isPlaceholder?: boolean;
}

export const AudioMemoryCard = ({ memory, isPlaceholder = false }: AudioMemoryCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayback = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(memory.content_url);
      audioRef.current.onended = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(err => console.error("Audio playback error:", err));
      setIsPlaying(true);
    }
  };

  return (
    <MemoryCard>
      <CardContent className="p-6">
        {isPlaceholder && (
          <div className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded absolute top-2 right-2">
            Demo
          </div>
        )}
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Clock className="h-4 w-4 mr-1" />
          <span>{new Date(memory.created_at).toLocaleDateString()}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2">{memory.title || "Untitled Audio Memory"}</h3>
        <p className="text-gray-700 mb-4">{memory.transcription || ""}</p>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>{memory.duration ? Math.floor(memory.duration / 60) : 0}m {memory.duration ? memory.duration % 60 : 0}s</span>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 px-6 py-4">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center"
          onClick={togglePlayback}
        >
          {isPlaying ? (
            <>
              <Pause className="h-4 w-4 mr-2" />
              Pause
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Play Audio
            </>
          )}
        </Button>
      </CardFooter>
    </MemoryCard>
  );
};
