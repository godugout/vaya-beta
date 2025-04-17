import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Story } from "./types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const ITEMS_PER_PAGE = 5;

export const useStories = (featuredOnly?: boolean) => {
  const { toast } = useToast();

  return useInfiniteQuery({
    queryKey: ["stories", { featuredOnly }],
    queryFn: async ({ pageParam = 0 }) => {
      const from = pageParam * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      try {
        let query = supabase
          .from('stories')
          .select('*')
          .order('created_at', { ascending: false });

        if (featuredOnly) {
          query = query.eq('is_featured', true);
        }

        const { data, error } = await query.range(from, to);

        if (error) {
          throw error;
        }

        return {
          stories: data,
          nextPage: data.length === ITEMS_PER_PAGE ? pageParam + 1 : undefined,
        };
      } catch (error) {
        console.error("Error fetching stories:", error);
        toast({
          variant: "destructive",
          title: "Error fetching stories",
          description: "There was a problem loading your stories. Please try again.",
        });

        return {
          stories: [],
          nextPage: undefined,
        };
      }
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });
};

export const useStory = (id?: string) => {
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

export const useCreateStory = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (story: Partial<Story>) => {
      const { data, error } = await supabase
        .from('stories')
        .insert(story)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
      toast({
        title: "Story created",
        description: "Your story has been created successfully.",
      });
    },
    onError: (error) => {
      console.error("Error creating story:", error);
      toast({
        variant: "destructive",
        title: "Error creating story",
        description: "There was a problem creating your story. Please try again.",
      });
    },
  });
};

export const useAddTagToStory = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ storyId, tag }: { storyId: string; tag: string }) => {
      const { data, error } = await supabase
        .from('story_tags')
        .insert({
          story_id: storyId,
          tag,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["story", variables.storyId] });
      toast({
        title: "Tag added",
        description: "The tag has been added to the story.",
      });
    },
    onError: (error) => {
      console.error("Error adding tag to story:", error);
      toast({
        variant: "destructive",
        title: "Error adding tag",
        description: "There was a problem adding the tag to the story. Please try again.",
      });
    },
  });
};
