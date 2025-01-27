import { useState, useEffect } from "react";
import { StoryMemory } from "./types";
import { Calendar, Play, Pause, Clock, Heart, MessageSquare, Share2 } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

interface StoryMemoryCardProps {
  memory: StoryMemory;
}

export const StoryMemoryCard = ({ memory }: StoryMemoryCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const { toast } = useToast();

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
      audio.play().catch(() => {
        toast({
          title: "Playback Error",
          description: "There was an error playing this audio.",
          variant: "destructive",
        });
      });
    }
    setIsPlaying(!isPlaying);
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>FM</AvatarFallback>
          </Avatar>
          
          <div className="flex-grow">
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
              <Calendar className="w-4 h-4" />
              {format(new Date(memory.created_at), "MMM d, yyyy")}
              {memory.duration && (
                <span className="flex items-center gap-1 ml-2">
                  <Clock className="w-4 h-4" />
                  {formatDuration(memory.duration)}
                </span>
              )}
            </div>
            
            <h3 className="text-gray-900 font-semibold mb-2">
              {memory.title || "Untitled Story"}
            </h3>
            
            {memory.description && (
              <p className="text-gray-600 text-sm mb-4">
                {memory.description}
              </p>
            )}

            <div className="space-y-4">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-center bg-gray-50 hover:bg-gray-100 border-vaya-secondary text-vaya-secondary hover:bg-vaya-secondary hover:text-white"
                onClick={handlePlayPause}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 mr-2" />
                ) : (
                  <Play className="w-4 h-4 mr-2" />
                )}
                <span>{isPlaying ? "Pause" : "Play"} Recording</span>
              </Button>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-vaya-secondary">
                  <Heart className="w-4 h-4 mr-2" />
                  Like
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-vaya-secondary">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Comment
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-vaya-secondary">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};