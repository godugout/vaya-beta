
import { useEffect, useRef, useCallback } from "react";
import { StoryMemoryCard } from "./StoryMemoryCard";
import { PhotoMemoryCard } from "./PhotoMemoryCard";
import { AudioMemoryCard } from "./AudioMemoryCard";
import { Memory, StoryMemory, PhotoMemory, AudioMemory } from "./types";
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from "framer-motion";
import { Message } from "@/components/chat/types";

interface MemoryFeedLayoutProps {
  memories: Memory[];
  chatMessages?: Message[];
  isLoading: boolean;
  hasNextPage?: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}

const MemoryFeedLayout = ({
  memories,
  chatMessages,
  isLoading,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage
}: MemoryFeedLayoutProps) => {
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
          <div key={i} className="bg-card dark:bg-gray-800 rounded-lg shadow-sm p-4 space-y-4">
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

  if (!memories.length) {
    return (
      <div className="text-center py-12 bg-card dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
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
        <h3 className="text-lg font-semibold text-foreground mb-2">No memories yet</h3>
        <p className="text-muted-foreground mb-6">Start capturing your family's precious moments</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Display chat messages if provided */}
      {chatMessages && chatMessages.length > 0 && (
        <div className="mb-8">
          {chatMessages.map((message, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-lg mb-3 ${
                message.role === 'assistant' 
                  ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800' 
                  : 'bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 ml-auto max-w-[80%]'
              }`}
            >
              <p>{message.content}</p>
              {message.attachments && message.attachments.map((attachment, i) => (
                attachment.type === 'audio' && (
                  <audio key={i} controls className="mt-2 w-full">
                    <source src={attachment.url} type="audio/webm" />
                    Your browser does not support the audio element.
                  </audio>
                )
              ))}
            </div>
          ))}
        </div>
      )}
      
      {memories.map((memory: Memory) => (
        <div key={memory.id} className="animate-fadeIn">
          {memory.type === "story" ? (
            <StoryMemoryCard memory={memory as StoryMemory} isPlaceholder={false} />
          ) : memory.type === "photo" ? (
            <PhotoMemoryCard memory={memory as PhotoMemory} isPlaceholder={false} />
          ) : memory.type === "audio" ? (
            <AudioMemoryCard memory={memory as AudioMemory} isPlaceholder={false} />
          ) : null}
        </div>
      ))}
      
      {(hasNextPage || isFetchingNextPage) && (
        <div ref={loadMoreRef} className="py-4">
          {isFetchingNextPage && (
            <div className="flex justify-center">
              <div className="animate-pulse text-muted-foreground">Loading more memories...</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MemoryFeedLayout;
