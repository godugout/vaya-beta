
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { EmotionType } from "@/components/emotion-detection/types";

interface EmotionTag {
  id: string;
  story_id: string;
  emotion: EmotionType;
  confidence: number;
  is_primary: boolean;
  created_at: string;
}

/**
 * Hook to fetch emotion tags for a story
 */
export const useEmotionTags = (storyId?: string) => {
  return useQuery({
    queryKey: ["emotionTags", storyId],
    queryFn: async () => {
      if (!storyId) return { emotionTags: [] };
      
      const { data, error } = await supabase
        .from('story_emotion_tags')
        .select('*')
        .eq('story_id', storyId)
        .order('is_primary', { ascending: false });
        
      if (error) throw error;
      
      return { emotionTags: data as EmotionTag[] };
    },
    enabled: !!storyId
  });
};

/**
 * Hook to add an emotion tag to a story
 */
export const useAddEmotionTag = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ 
      storyId, 
      emotion, 
      confidence, 
      isPrimary = false 
    }: { 
      storyId: string; 
      emotion: EmotionType; 
      confidence: number;
      isPrimary?: boolean;
    }) => {
      // If this is the primary emotion, first update all existing tags to not be primary
      if (isPrimary) {
        await supabase
          .from('story_emotion_tags')
          .update({ is_primary: false })
          .eq('story_id', storyId);
      }
      
      // Now insert the new tag
      const { data, error } = await supabase
        .from('story_emotion_tags')
        .insert({
          story_id: storyId,
          emotion,
          confidence,
          is_primary: isPrimary
        })
        .select()
        .single();

      if (error) {
        // Check if this is a duplicate - if so, just update confidence
        if (error.code === '23505') { // Unique violation
          const { data: existingTag, error: fetchError } = await supabase
            .from('story_emotion_tags')
            .select('id')
            .eq('story_id', storyId)
            .eq('emotion', emotion)
            .single();
            
          if (fetchError) throw fetchError;
          
          const { data: updatedTag, error: updateError } = await supabase
            .from('story_emotion_tags')
            .update({ 
              confidence, 
              is_primary: isPrimary 
            })
            .eq('id', existingTag.id)
            .select()
            .single();
            
          if (updateError) throw updateError;
          
          return updatedTag;
        }
        
        throw error;
      }

      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["emotionTags", variables.storyId] });
      queryClient.invalidateQueries({ queryKey: ["story", variables.storyId] });
      
      toast({
        title: variables.isPrimary ? "Primary emotion updated" : "Emotion tag added",
        description: `The story's emotion has been ${variables.isPrimary ? 'updated' : 'tagged'}.`,
      });
    },
    onError: (error) => {
      console.error("Error adding emotion tag:", error);
      toast({
        variant: "destructive",
        title: "Error adding emotion tag",
        description: "There was a problem tagging the emotion. Please try again.",
      });
    },
  });
};

/**
 * Hook to update the primary emotion for a story
 */
export const useUpdatePrimaryEmotion = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async ({ 
      storyId, 
      emotion
    }: { 
      storyId: string; 
      emotion: EmotionType;
    }) => {
      // First, update all tags for this story to not be primary
      const { error: updateError } = await supabase
        .from('story_emotion_tags')
        .update({ is_primary: false })
        .eq('story_id', storyId);
        
      if (updateError) throw updateError;
      
      // Then, set the selected emotion as primary
      const { data: existingTag, error: fetchError } = await supabase
        .from('story_emotion_tags')
        .select('id')
        .eq('story_id', storyId)
        .eq('emotion', emotion);
        
      if (fetchError) throw fetchError;
      
      if (existingTag && existingTag.length > 0) {
        // Update existing tag
        const { data, error } = await supabase
          .from('story_emotion_tags')
          .update({ is_primary: true })
          .eq('id', existingTag[0].id)
          .select()
          .single();
          
        if (error) throw error;
        
        return data;
      } else {
        // Create new tag as primary
        const { data, error } = await supabase
          .from('story_emotion_tags')
          .insert({
            story_id: storyId,
            emotion,
            confidence: 1.0, // Max confidence for manual selection
            is_primary: true
          })
          .select()
          .single();
          
        if (error) throw error;
        
        return data;
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["emotionTags", variables.storyId] });
      queryClient.invalidateQueries({ queryKey: ["story", variables.storyId] });
      
      toast({
        title: "Primary emotion updated",
        description: `The story's primary emotion has been changed to ${variables.emotion}.`,
      });
    },
    onError: (error) => {
      console.error("Error updating primary emotion:", error);
      toast({
        variant: "destructive",
        title: "Error updating emotion",
        description: "There was a problem updating the primary emotion. Please try again.",
      });
    },
  });
};

/**
 * Hook to remove an emotion tag from a story
 */
export const useRemoveEmotionTag = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (tagId: string) => {
      const { data, error } = await supabase
        .from('story_emotion_tags')
        .delete()
        .eq('id', tagId)
        .select()
        .single();

      if (error) throw error;

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["emotionTags", data.story_id] });
      queryClient.invalidateQueries({ queryKey: ["story", data.story_id] });
      
      toast({
        title: "Emotion tag removed",
        description: "The emotion tag has been removed from the story.",
      });
    },
    onError: (error) => {
      console.error("Error removing emotion tag:", error);
      toast({
        variant: "destructive",
        title: "Error removing tag",
        description: "There was a problem removing the emotion tag. Please try again.",
      });
    },
  });
};
