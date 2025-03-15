
import { useEffect, useRef, useCallback } from "react";
import { StoryMemoryCard } from "./StoryMemoryCard";
import { PhotoMemoryCard } from "./PhotoMemoryCard";
import { useMemories } from "./useMemories";
import { Memory } from "./types";
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

const MemoryFeedLayout = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useMemories();

  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(loadMoreRef);

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (isInView) {
      loadMore();
    }
  }, [isInView, loadMore]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-4 space-y-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  const memories = data?.pages.flatMap((page) => page.memories) ?? [];

  if (!memories.length) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No memories yet</h3>
        <p className="text-gray-500 mb-6">Start capturing your family's precious moments</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Alert variant="default" className="bg-gray-100 border-gray-200 mb-4">
        <AlertDescription className="flex items-center text-sm text-gray-600">
          <Info className="h-4 w-4 mr-2" />
          The content below is demo data. Connect to a real database for your actual memories.
        </AlertDescription>
      </Alert>
      
      {memories.map((memory: Memory) => (
        <div key={memory.id} className="animate-fadeIn">
          {memory.type === "story" ? (
            <StoryMemoryCard memory={memory} isPlaceholder={true} />
          ) : (
            <PhotoMemoryCard memory={memory} isPlaceholder={true} />
          )}
        </div>
      ))}
      
      {(hasNextPage || isFetchingNextPage) && (
        <div ref={loadMoreRef} className="py-4">
          {isFetchingNextPage && (
            <div className="flex justify-center">
              <div className="animate-pulse text-gray-400">Loading more memories...</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MemoryFeedLayout;
