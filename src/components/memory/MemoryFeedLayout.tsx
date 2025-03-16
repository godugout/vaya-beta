
import { useEffect, useRef, useCallback } from "react";
import { StoryMemoryCard } from "./StoryMemoryCard";
import { PhotoMemoryCard } from "./PhotoMemoryCard";
import { useMemories } from "./useMemories";
import { Memory } from "./types";
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Plus, Camera, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
          <Plus className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No memories yet</h3>
        <p className="text-gray-500 mb-6">Start capturing your family's precious moments</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
            <Camera className="h-4 w-4" />
            <span>Add Photo Memory</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Mic className="h-4 w-4" />
            <span>Record Story</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Alert variant="default" className="bg-gray-100 border-gray-200 mb-4">
        <AlertDescription className="flex items-center text-sm text-gray-600">
          <Info className="h-4 w-4 mr-2" />
          The content below is demo data. Your actual memories will appear here once you start capturing them.
        </AlertDescription>
      </Alert>
      
      <div className="flex justify-end mb-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Camera className="h-3.5 w-3.5" />
            <span>Photo</span>
          </Button>
          <Button size="sm" className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700">
            <Mic className="h-3.5 w-3.5" />
            <span>Record</span>
          </Button>
        </div>
      </div>
      
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
      
      <div className="text-center border-t border-gray-100 pt-6 mt-8">
        <p className="text-sm text-gray-500 mb-4">Want to learn more about preserving your family memories?</p>
        <Link to="/sacred-foundation">
          <Button variant="outline" size="sm">
            Explore Memory Preservation
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MemoryFeedLayout;
