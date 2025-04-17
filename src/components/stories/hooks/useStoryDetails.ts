
import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

/**
 * Hook to fetch details for a specific story by ID
 */
export const useStoryDetails = (id?: string) => {
  const { toast } = useToast();

  return useInfiniteQuery({
    queryKey: ["story", id],
    queryFn: async () => {
      if (!id) {
        return { story: null, tags: [] };
      }

      try {
        // Fetch the story
        const { data: story, error: storyError } = await supabase
          .from('stories')
          .select('*')
          .eq('id', id)
          .single();

        if (storyError) {
          throw storyError;
        }

        // Fetch the story tags
        const { data: tags, error: tagsError } = await supabase
          .from('story_tags')
          .select('*')
          .eq('story_id', id);

        if (tagsError) {
          throw tagsError;
        }

        return {
          story,
          tags,
        };
      } catch (error) {
        console.error("Error fetching story:", error);
        toast({
          variant: "destructive",
          title: "Error fetching story",
          description: "There was a problem loading the story. Please try again.",
        });

        return {
          story: null,
          tags: [],
        };
      }
    },
    getNextPageParam: () => null, // No pagination needed for single story
    initialPageParam: 0,
    enabled: !!id,
  });
};
