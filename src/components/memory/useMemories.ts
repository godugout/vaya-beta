import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Memory, StoryMemory, PhotoMemory } from "./types";

const ITEMS_PER_PAGE = 5;

export const useMemories = () => {
  return useInfiniteQuery({
    queryKey: ["memories"],
    queryFn: async ({ pageParam = 0 }) => {
      const start = pageParam * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE - 1;

      const { data: memoriesData, error: memoriesError } = await supabase
        .from("memories")
        .select("*")
        .order("created_at", { ascending: false })
        .range(start, end);

      if (memoriesError) throw memoriesError;

      // For development, use sample data if no real data exists
      const memories = memoriesData?.length ? memoriesData : sampleMemories.slice(start, end + 1);

      // Then fetch associated story titles and photo URLs
      const enrichedMemories = await Promise.all(memories.map(async (memory) => {
        if (memory.type === "story") {
          const { data: storyData } = await supabase
            .from("stories")
            .select("title, description, duration")
            .eq("id", memory.id)
            .maybeSingle();
          return { 
            ...memory, 
            title: storyData?.title,
            description: storyData?.description,
            duration: storyData?.duration
          } as StoryMemory;
        } else if (memory.type === "photo") {
          const { data: photoData } = await supabase
            .from("photos")
            .select("photo_url, caption")
            .eq("id", memory.id)
            .maybeSingle();
          return { 
            ...memory, 
            photo_url: photoData?.photo_url,
            caption: photoData?.caption
          } as PhotoMemory;
        }
        return memory as Memory;
      }));

      return {
        memories: enrichedMemories,
        nextPage: enrichedMemories.length === ITEMS_PER_PAGE ? pageParam + 1 : undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });
};

// Sample data for development
const sampleMemories: Memory[] = [
  {
    id: "1",
    type: "story",
    content_url: "/path/to/sample-audio.mp3",
    created_at: "2024-03-20T10:00:00Z",
    title: "Abuela's Secret Gallo Pinto Recipe",
    description: "My grandmother shares the story behind our family's traditional Costa Rican breakfast, passed down through generations. She reveals her secret ingredient that makes her gallo pinto special and talks about morning traditions in our family.",
    duration: 180,
  },
  {
    id: "2",
    type: "photo",
    content_url: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    created_at: "2024-03-19T15:30:00Z",
    photo_url: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    caption: "Family trip to Monteverde Cloud Forest - The kids were amazed by the wildlife!",
  },
  {
    id: "3",
    type: "story",
    content_url: "/path/to/sample-audio2.mp3",
    created_at: "2024-03-18T09:15:00Z",
    title: "The Day We Moved to Costa Rica",
    description: "Dad shares the incredible story of how our family made the bold decision to move to Costa Rica in 1995. From the challenges we faced to the beautiful moments that made it all worth it.",
    duration: 240,
  },
  {
    id: "4",
    type: "photo",
    content_url: "https://images.unsplash.com/photo-1501286353178-1ec871214838",
    created_at: "2024-03-17T14:20:00Z",
    photo_url: "https://images.unsplash.com/photo-1501286353178-1ec871214838",
    caption: "Morning visitors at our backyard in Tamarindo - The local monkeys have become part of our daily routine!",
  },
  {
    id: "5",
    type: "story",
    content_url: "/path/to/sample-audio3.mp3",
    created_at: "2024-03-16T11:30:00Z",
    title: "Our First Pura Vida Christmas",
    description: "Mom recalls our first Christmas celebration in Costa Rica, blending our family traditions with local customs. From tamales making to the Festival de la Luz.",
    duration: 300,
  },
  {
    id: "6",
    type: "photo",
    content_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    created_at: "2024-03-15T16:45:00Z",
    photo_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    caption: "Family sunset gathering at Manuel Antonio Beach - A perfect end to our reunion weekend",
  }
];