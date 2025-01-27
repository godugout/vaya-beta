import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Memory, StoryMemory, PhotoMemory } from "./types";

export const useMemories = () => {
  return useQuery({
    queryKey: ["memories"],
    queryFn: async () => {
      const { data: memoriesData, error: memoriesError } = await supabase
        .from("memories")
        .select("*")
        .order("created_at", { ascending: false });

      if (memoriesError) throw memoriesError;

      // Then fetch associated story titles and photo URLs
      const enrichedMemories = await Promise.all((memoriesData || []).map(async (memory) => {
        if (memory.type === "story") {
          const { data: storyData } = await supabase
            .from("stories")
            .select("title")
            .eq("id", memory.id)
            .maybeSingle();
          return { ...memory, title: storyData?.title } as StoryMemory;
        } else if (memory.type === "photo") {
          const { data: photoData } = await supabase
            .from("photos")
            .select("photo_url")
            .eq("id", memory.id)
            .maybeSingle();
          return { ...memory, photo_url: photoData?.photo_url } as PhotoMemory;
        }
        return memory as Memory;
      }));

      return enrichedMemories;
    },
  });
};