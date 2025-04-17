
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, MessageSquare, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StoryMemoryCard } from "@/components/memory/StoryMemoryCard";
import { PhotoMemoryCard } from "@/components/memory/PhotoMemoryCard";
import { AudioMemoryCard } from "@/components/memory/AudioMemoryCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Memory } from "@/components/memory/types";

// Sample memories for development
const sampleMemories: Record<string, Memory> = {
  "1": {
    id: "1",
    type: "story",
    content_url: "/path/to/sample-audio.mp3",
    created_at: "2024-03-20T10:00:00Z",
    title: "Abuela's Secret Gallo Pinto Recipe",
    description: "My grandmother shares the story behind our family's traditional Costa Rican breakfast, passed down through generations. She reveals her secret ingredient that makes her gallo pinto special and talks about morning traditions in our family.",
    duration: 180,
  },
  "2": {
    id: "2",
    type: "photo",
    content_url: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    created_at: "2024-03-19T15:30:00Z",
    photo_url: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    caption: "Family trip to Monteverde Cloud Forest - The kids were amazed by the wildlife!",
  },
  "3": {
    id: "3",
    type: "audio",
    content_url: "/path/to/sample-audio2.mp3",
    created_at: "2024-03-18T09:15:00Z",
    title: "Sounds of the Rainforest",
    transcription: "I recorded these amazing sounds during our morning hike through the rainforest. You can hear the howler monkeys and tropical birds in the background.",
    duration: 120,
  }
};

const MemoryPost = () => {
  const { id } = useParams();

  const { data: memory, isLoading } = useQuery({
    queryKey: ["memory", id],
    queryFn: async () => {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Use sample data based on ID
      const memoryData = sampleMemories[id || ""] || sampleMemories["1"];
      if (!memoryData) throw new Error("Memory not found");
      
      return memoryData;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="border-b bg-white">
          <div className="container mx-auto px-4">
            <div className="h-16 flex items-center">
              <Skeleton className="h-8 w-32" />
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <Skeleton className="h-96 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!memory) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Memory not found</h1>
          <p className="text-gray-600 mb-4">This memory might have been removed or you don't have access to it.</p>
          <Link to="/memory-lane">
            <Button variant="outline">Return to Memory Lane</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/memory-lane"
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Memory Lane
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-gray-900"
              >
                <MessageSquare className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-gray-900"
              >
                <Share2 className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-gray-900"
              >
                <Bookmark className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {memory.type === "story" ? (
            <StoryMemoryCard memory={memory} />
          ) : memory.type === "photo" ? (
            <PhotoMemoryCard memory={memory} />
          ) : memory.type === "audio" ? (
            <AudioMemoryCard memory={memory} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MemoryPost;
