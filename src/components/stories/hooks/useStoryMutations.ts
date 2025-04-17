
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Story } from "../types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

/**
 * Hook for creating a new story
 */
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

/**
 * Hook for adding a tag to a story
 */
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
