
import { useInfiniteQuery } from "@tanstack/react-query";
import { Memory, MemoryRecord, StoryMemory, PhotoMemory, AudioMemory } from "./types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const ITEMS_PER_PAGE = 5;

// Convert database record to Memory object
const convertToMemory = (record: MemoryRecord): Memory => {
  const baseMemory: Memory = {
    id: record.id,
    type: record.memory_type,
    content_url: record.content_url,
    created_at: record.created_at,
    title: record.title,
    description: record.description,
    metadata: record.metadata,
  };

  // Add type-specific properties
  if (record.memory_type === 'photo') {
    return {
      ...baseMemory,
      type: 'photo',
      photo_url: record.content_url,
      caption: record.description,
    } as PhotoMemory;
  } else if (record.memory_type === 'audio') {
    return {
      ...baseMemory,
      type: 'audio',
      content: record.description || '',
      duration: record.metadata?.duration || 0,
    } as AudioMemory;
  } else {
    // Story type
    return {
      ...baseMemory,
      type: 'story',
      duration: record.metadata?.duration || 0,
    } as StoryMemory;
  }
};

export const useMemories = () => {
  const { toast } = useToast();

  return useInfiniteQuery({
    queryKey: ["memories"],
    queryFn: async ({ pageParam = 0 }) => {
      const from = pageParam * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      try {
        // Fetch memories from Supabase
        const { data, error } = await supabase
          .from('memories')
          .select('*')
          .order('created_at', { ascending: false })
          .range(from, to);

        if (error) {
          throw error;
        }

        // Convert database records to Memory objects
        const memories = data.map(convertToMemory);

        return {
          memories,
          nextPage: memories.length === ITEMS_PER_PAGE ? pageParam + 1 : undefined,
        };
      } catch (error) {
        console.error("Error fetching memories:", error);
        toast({
          variant: "destructive",
          title: "Error fetching memories",
          description: "There was a problem loading your memories. Please try again.",
        });

        // Return empty array in case of error
        return {
          memories: [],
          nextPage: undefined,
        };
      }
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });
};
