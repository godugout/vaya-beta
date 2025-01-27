import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Image, Play, Pause, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Memory = {
  id: string;
  type: string;
  content_url: string;
  created_at: string;
  title?: string;
  photo_url?: string;
};

const MemoryFeed = () => {
  const [isPlaying, setIsPlaying] = useState<{ [key: string]: boolean }>({});
  const [audioElements, setAudioElements] = useState<{ [key: string]: HTMLAudioElement }>({});

  const { data: memories, isLoading } = useQuery({
    queryKey: ["memories"],
    queryFn: async () => {
      const { data: memoriesData, error: memoriesError } = await supabase
        .from("memories")
        .select(`
          *,
          stories(title),
          photos(photo_url)
        `)
        .order("created_at", { ascending: false });

      if (memoriesError) throw memoriesError;
      return memoriesData || [];
    },
  });

  const handlePlayPause = (memoryId: string, audioUrl: string) => {
    if (!audioElements[memoryId]) {
      const audio = new Audio(audioUrl);
      setAudioElements(prev => ({ ...prev, [memoryId]: audio }));
    }

    const audio = audioElements[memoryId];
    if (isPlaying[memoryId]) {
      audio?.pause();
    } else {
      audio?.play();
    }
    setIsPlaying(prev => ({ ...prev, [memoryId]: !prev[memoryId] }));
  };

  useEffect(() => {
    return () => {
      // Cleanup audio elements on unmount
      Object.values(audioElements).forEach(audio => audio.pause());
    };
  }, [audioElements]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-pulse text-gray-400">Loading memories...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {memories?.map((memory: Memory) => (
        <Card key={memory.id} className="bg-[#2A2A2A] border-[#3A3A3A] overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              {memory.type === "photo" && memory.photo_url && (
                <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={memory.photo_url}
                    alt="Memory"
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <div className="flex-grow">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(memory.created_at), "MMM d, yyyy")}
                </div>
                {memory.type === "story" && (
                  <h3 className="text-white font-semibold mb-2">
                    {memory.title || "Untitled Story"}
                  </h3>
                )}
                {memory.type === "story" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-[#3A3A3A] hover:bg-[#4A4A4A] border-none"
                    onClick={() => handlePlayPause(memory.id, memory.content_url)}
                  >
                    {isPlaying[memory.id] ? (
                      <Pause className="w-4 h-4 text-[#8B5CF6]" />
                    ) : (
                      <Play className="w-4 h-4 text-[#8B5CF6]" />
                    )}
                    <span className="ml-2">
                      {isPlaying[memory.id] ? "Pause" : "Play"}
                    </span>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MemoryFeed;