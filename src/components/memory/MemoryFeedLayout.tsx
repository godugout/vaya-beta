
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
          <div key={i} className="hanuman-card p-4 space-y-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full bg-hanuman-primary/30" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32 bg-hanuman-primary/30" />
                <Skeleton className="h-3 w-24 bg-hanuman-primary/30" />
              </div>
            </div>
            <Skeleton className="h-48 w-full rounded-lg bg-hanuman-primary/30" />
          </div>
        ))}
      </div>
    );
  }

  const memories = data?.pages.flatMap((page) => page.memories) ?? [];

  if (!memories.length) {
    return (
      <div className="text-center py-8 hanuman-card">
        <div className="mx-auto w-24 h-24 bg-hanuman-primary/20 rounded-full flex items-center justify-center mb-4">
          <Plus className="w-12 h-12 text-hanuman-primary" />
        </div>
        <h3 className="text-lg font-semibold text-hanuman-text-primary mb-2">No memories recorded</h3>
        <p className="text-hanuman-text-secondary mb-6">Begin documenting your family's memories</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button className="bg-hanuman-primary hover:bg-hanuman-orange/80 flex items-center gap-2">
            <Camera className="h-4 w-4" />
            <span>Add Photo Memory</span>
          </Button>
          <Button variant="outline" className="border-hanuman-border-color text-hanuman-text-primary flex items-center gap-2 hover:bg-hanuman-primary/10">
            <Mic className="h-4 w-4" />
            <span>Record Audio Log</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Alert variant="default" className="bg-hanuman-primary/10 border-hanuman-primary/20 mb-4">
        <AlertDescription className="flex items-center text-sm text-hanuman-text-secondary">
          <Info className="h-4 w-4 mr-2 text-hanuman-gold" />
          Demonstration data below. Your actual memory logs will appear here once recorded.
        </AlertDescription>
      </Alert>
      
      <div className="flex justify-end mb-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-hanuman-border-color text-hanuman-text-primary flex items-center gap-1 hover:bg-hanuman-primary/10">
            <Camera className="h-3.5 w-3.5" />
            <span>Photo Log</span>
          </Button>
          <Button size="sm" className="bg-hanuman-primary hover:bg-hanuman-orange/80 flex items-center gap-1">
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
            <div className="inline-flex items-center text-hanuman-gold">
              <div className="animate-pulse mr-2">●</div>
              Loading additional memory logs...
            </div>
          )}
        </div>
      )}
      
      <div className="text-center border-t border-hanuman-border-color pt-6 mt-6">
        <p className="text-sm text-hanuman-text-secondary mb-4">Explore more Hanuman memory preservation features</p>
        <Link to="/hanuman">
          <Button variant="outline" size="sm" className="border-hanuman-border-color text-hanuman-text-primary hover:bg-hanuman-primary/10">
            Hanuman Edition
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MemoryFeedLayout;
