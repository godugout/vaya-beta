
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
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-glass rounded-lg p-4 space-y-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full bg-space-indigo/30" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32 bg-space-indigo/30" />
                <Skeleton className="h-3 w-24 bg-space-indigo/30" />
              </div>
            </div>
            <Skeleton className="h-48 w-full rounded-lg bg-space-indigo/30" />
          </div>
        ))}
      </div>
    );
  }

  const memories = data?.pages.flatMap((page) => page.memories) ?? [];

  if (!memories.length) {
    return (
      <div className="text-center py-8 space-glass rounded-lg">
        <div className="mx-auto w-24 h-24 bg-space-indigo/20 rounded-full flex items-center justify-center mb-4">
          <Plus className="w-12 h-12 text-space-light-blue" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">No memories recorded</h3>
        <p className="text-gray-300 mb-6">Begin documenting your family's mission history</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button className="bg-nasa-blue hover:bg-space-blue flex items-center gap-2">
            <Camera className="h-4 w-4" />
            <span>Add Photo Memory</span>
          </Button>
          <Button variant="outline" className="border-space-indigo text-white flex items-center gap-2 hover:bg-space-indigo/30">
            <Mic className="h-4 w-4" />
            <span>Record Audio Log</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Alert variant="default" className="bg-space-indigo/20 border-space-indigo mb-4">
        <AlertDescription className="flex items-center text-sm text-gray-300">
          <Info className="h-4 w-4 mr-2 text-space-light-blue" />
          Mission data below is for simulation purposes. Your actual memory logs will appear here once recorded.
        </AlertDescription>
      </Alert>
      
      <div className="flex justify-end mb-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-space-indigo text-white flex items-center gap-1 hover:bg-space-indigo/30">
            <Camera className="h-3.5 w-3.5" />
            <span>Photo Log</span>
          </Button>
          <Button size="sm" className="bg-nasa-blue hover:bg-space-blue flex items-center gap-1">
            <Mic className="h-3.5 w-3.5" />
            <span>Record</span>
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {memories.map((memory: Memory) => (
          <div key={memory.id} className="animate-fadeIn">
            {memory.type === "story" ? (
              <StoryMemoryCard memory={memory} isPlaceholder={true} />
            ) : (
              <PhotoMemoryCard memory={memory} isPlaceholder={true} />
            )}
          </div>
        ))}
      </div>
      
      {(hasNextPage || isFetchingNextPage) && (
        <div ref={loadMoreRef} className="py-4 text-center">
          {isFetchingNextPage && (
            <div className="inline-flex items-center text-space-light-blue">
              <div className="animate-pulse mr-2">●</div>
              Loading additional memory logs...
            </div>
          )}
        </div>
      )}
      
      <div className="text-center border-t border-space-indigo/30 pt-6 mt-6">
        <p className="text-sm text-gray-400 mb-4">Explore the NASA Memory Preservation initiative</p>
        <Link to="/sacred-foundation">
          <Button variant="outline" size="sm" className="border-space-indigo text-white hover:bg-space-indigo/30">
            Memory Archival Systems
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MemoryFeedLayout;
