import { StoryMemoryCard } from "./StoryMemoryCard";
import { PhotoMemoryCard } from "./PhotoMemoryCard";
import { useMemories } from "./useMemories";
import { Memory } from "./types";

const MemoryFeedLayout = () => {
  const { data: memories, isLoading } = useMemories();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-pulse text-vaya-gray-400">Loading memories...</div>
      </div>
    );
  }

  if (!memories?.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] text-center p-8">
        <div className="text-vaya-gray-500 mb-4">No memories yet</div>
        <p className="text-vaya-gray-400 text-sm max-w-md">
          Start capturing your wildlife encounters by adding photos or recording stories
        </p>
      </div>
    );
  }

  // Split memories into two columns
  const splitMemories = memories.reduce<[Memory[], Memory[]]>(
    (acc, memory, index) => {
      acc[index % 2].push(memory);
      return acc;
    },
    [[], []]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {splitMemories.map((column, columnIndex) => (
        <div key={columnIndex} className="space-y-6">
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