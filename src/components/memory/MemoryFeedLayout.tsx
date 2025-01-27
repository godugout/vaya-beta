import { StoryMemoryCard } from "./StoryMemoryCard";
import { PhotoMemoryCard } from "./PhotoMemoryCard";
import { useMemories } from "./useMemories";
import { Memory } from "./types";

const MemoryFeedLayout = () => {
  const { data: memories, isLoading } = useMemories();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-pulse text-gray-400">Loading memories...</div>
      </div>
    );
  }

  // Split memories into two columns
  const splitMemories = memories?.reduce<[Memory[], Memory[]]>(
    (acc, memory, index) => {
      acc[index % 2].push(memory);
      return acc;
    },
    [[], []]
  ) ?? [[], []];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {splitMemories.map((column, columnIndex) => (
        <div key={columnIndex} className="space-y-4">
          {column.map((memory) => (
            memory.type === "story" ? (
              <StoryMemoryCard key={memory.id} memory={memory} />
            ) : (
              <PhotoMemoryCard key={memory.id} memory={memory} />
            )
          ))}
        </div>
      ))}
    </div>
  );
};

export default MemoryFeedLayout;