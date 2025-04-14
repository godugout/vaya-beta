
import { StoryMemoryCard } from "./memory/StoryMemoryCard";
import { PhotoMemoryCard } from "./memory/PhotoMemoryCard";
import { useMemories } from "./memory/useMemories";
import { Memory, isPhotoMemory, isStoryMemory } from "./memory/types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

const MemoryFeed = () => {
  const { data, isLoading } = useMemories();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-pulse text-gray-400">Loading memories...</div>
      </div>
    );
  }

  const memories = data?.pages.flatMap((page) => page.memories) ?? [];

  return (
    <div className="space-y-4 animate-fade-in">
      <Alert variant="default" className="bg-gray-100 border-gray-200 mb-4">
        <AlertDescription className="flex items-center text-sm text-gray-600">
          <Info className="h-4 w-4 mr-2" />
          The content below is demo data. Connect to a real database for your actual memories.
        </AlertDescription>
      </Alert>
      
      {memories.map((memory: Memory) => {
        if (isStoryMemory(memory)) {
          return <StoryMemoryCard key={memory.id} memory={memory} isPlaceholder={true} />;
        } else if (isPhotoMemory(memory)) {
          return <PhotoMemoryCard key={memory.id} memory={memory} isPlaceholder={true} />;
        } else {
          // Fallback for other types (video, audio)
          return null;
        }
      })}
    </div>
  );
};

export default MemoryFeed;
