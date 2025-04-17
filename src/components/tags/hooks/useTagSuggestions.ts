
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TagSuggestion } from "../types";

/**
 * Provides tag suggestions based on content title and description
 */
export const useTagSuggestions = (contentType: string, title: string, description?: string) => {
  return useQuery({
    queryKey: ["tagSuggestions", contentType, title],
    queryFn: async () => {
      if (!title) return [];
      
      // First, extract keywords from title and description
      const content = `${title} ${description || ""}`.toLowerCase();
      const words = content
        .split(/\s+/)
        .filter(word => word.length > 3) // Only consider words longer than 3 chars
        .filter(word => !["this", "that", "with", "from", "have", "were", "they", "their", "about"].includes(word));
      
      // Get existing popular tags
      const { data: existingTags, error } = await supabase
        .from('story_tags')
        .select('tag')
        .order('created_at', { ascending: false })
        .limit(20);
        
      if (error) {
        throw error;
      }
      
      const suggestedTags: TagSuggestion[] = [];
      
      // Add existing tags that match content keywords
      const existingTagsList = existingTags.map(t => t.tag.toLowerCase());
      
      // First, direct matches from existing tags
      existingTagsList.forEach(tag => {
        if (content.includes(tag)) {
          suggestedTags.push({
            tag,
            relevance: 1
          });
        }
      });
      
      // Then, extract keywords as potential tags
      words.forEach(word => {
        // Skip if this word is already added as a tag
        if (!suggestedTags.some(t => t.tag === word) && 
            !existingTagsList.includes(word)) {
          suggestedTags.push({
            tag: word,
            relevance: 0.7
          });
        }
      });
      
      // Deduplicate and sort by relevance
      return suggestedTags
        .sort((a, b) => b.relevance - a.relevance)
        .slice(0, 5);
    },
    enabled: !!title
  });
};
