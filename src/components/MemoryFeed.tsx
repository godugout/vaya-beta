import { StoryMemoryCard } from "./memory/StoryMemoryCard";
import { PhotoMemoryCard } from "./memory/PhotoMemoryCard";
import { useMemories } from "./memory/useMemories";
import { Memory } from "./memory/types";

const MemoryFeed = () => {
  const { data: memories, isLoading } = useMemories();

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
        memory.type === "story" ? (
          <StoryMemoryCard key={memory.id} memory={memory} />
        ) : (
          <PhotoMemoryCard key={memory.id} memory={memory} />
        )
      ))}
    </div>
  );
};

export default MemoryFeed;