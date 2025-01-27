import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Memory, StoryMemory, PhotoMemory } from "./types";

// Sample data for development
const sampleMemories: Memory[] = [
  {
    id: "1",
    type: "story",
    content_url: "/path/to/sample-audio.mp3",
    created_at: "2024-03-20T10:00:00Z",
    title: "Grandma's Secret Recipe",
    description: "The story behind our family's traditional holiday cookies...",
    duration: 180, // 3 minutes
  },
  {
    id: "2",
    type: "photo",
    content_url: "/placeholder.svg",
    created_at: "2024-03-19T15:30:00Z",
    photo_url: "/placeholder.svg",
    caption: "Summer BBQ 2023",
  },
  {
    id: "3",
    type: "story",
    content_url: "/path/to/sample-audio2.mp3",
    created_at: "2024-03-18T09:15:00Z",
    title: "Dad's First Car",
    description: "The adventures and mishaps with that old Volkswagen...",
    duration: 240, // 4 minutes
  },
  {
    id: "4",
    type: "photo",
    content_url: "/placeholder.svg",
    created_at: "2024-03-17T14:20:00Z",
    photo_url: "/placeholder.svg",
    caption: "Family Reunion 2023",
  },
];

export const useMemories = () => {
  return useQuery({
    queryKey: ["memories"],
    queryFn: async () => {
      const { data: memoriesData, error: memoriesError } = await supabase
        .from("memories")
        .select("*")
        .order("created_at", { ascending: false });

      if (memoriesError) throw memoriesError;

      // For development, combine real data with sample data if no real data exists
      const memories = memoriesData?.length ? memoriesData : sampleMemories;

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

      return enrichedMemories;
    },
  });
};