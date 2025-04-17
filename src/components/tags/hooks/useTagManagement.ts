
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Tag, TagCount } from "../types";

/**
 * Hook for managing tags across different content types
 */
export const useTagManagement = (contentType: 'story' | 'memory' | 'photo' | 'capsule') => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  // Determine the table name based on content type
  const getTableName = () => {
    switch (contentType) {
      case 'story':
        return 'story_tags';
      case 'memory':
        return 'memory_tags';
      // For other types, we'll use the memory_tags table for now
      // We could add more specific tables in the future if needed
      default:
        return 'memory_tags';
    }
  };

  const getContentIdField = () => {
    switch (contentType) {
      case 'story':
        return 'story_id';
      case 'memory':
        return 'memory_id';
      default:
        return 'memory_id';
    }
  };

  // Add a tag to content
  const addTag = useMutation({
    mutationFn: async ({ contentId, tag }: { contentId: string; tag: string }) => {
      const tableName = getTableName();
      const contentIdField = getContentIdField();
      
      const { data, error } = await supabase
        .from(tableName)
        .insert({
          [contentIdField]: contentId,
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
      queryClient.invalidateQueries({ queryKey: [contentType, variables.contentId, "tags"] });
      queryClient.invalidateQueries({ queryKey: ["tags", "popular"] });
      toast({
        title: "Tag added",
        description: "The tag has been added successfully.",
      });
    },
    onError: (error) => {
      console.error("Error adding tag:", error);
      toast({
        variant: "destructive",
        title: "Error adding tag",
        description: "There was a problem adding the tag. Please try again.",
      });
    },
  });

  // Remove a tag from content
  const removeTag = useMutation({
    mutationFn: async (tagId: string) => {
      const tableName = getTableName();
      
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', tagId);

      if (error) {
        throw error;
      }

      return tagId;
    },
    onSuccess: (_, tagId) => {
      queryClient.invalidateQueries({ queryKey: [contentType, "tags"] });
      queryClient.invalidateQueries({ queryKey: ["tags", "popular"] });
      toast({
        title: "Tag removed",
        description: "The tag has been removed successfully.",
      });
    },
    onError: (error) => {
      console.error("Error removing tag:", error);
      toast({
        variant: "destructive",
        title: "Error removing tag",
        description: "There was a problem removing the tag. Please try again.",
      });
    },
  });

  return {
    addTag,
    removeTag,
  };
};

/**
 * Hook to get the tags for a specific content item
 */
export const useContentTags = (contentType: 'story' | 'memory' | 'photo' | 'capsule', contentId?: string) => {
  const getTableName = () => {
    switch (contentType) {
      case 'story':
        return 'story_tags';
      case 'memory':
        return 'memory_tags';
      default:
        return 'memory_tags';
    }
  };

  const getContentIdField = () => {
    switch (contentType) {
      case 'story':
        return 'story_id';
      case 'memory':
        return 'memory_id';
      default:
        return 'memory_id';
    }
  };

  return useQuery({
    queryKey: [contentType, contentId, "tags"],
    queryFn: async () => {
      if (!contentId) return [];
      
      const tableName = getTableName();
      const contentIdField = getContentIdField();
      
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq(contentIdField, contentId);

      if (error) {
        throw error;
      }

      return data as Tag[];
    },
    enabled: !!contentId,
  });
};

/**
 * Hook to get popular tags across the application
 */
export const usePopularTags = (limit: number = 10) => {
  return useQuery({
    queryKey: ["tags", "popular", limit],
    queryFn: async () => {
      // Query the story_tags table since it's the most established
      const { data: storyTags, error: storyError } = await supabase
        .from('story_tags')
        .select('tag');

      if (storyError) {
        throw storyError;
      }

      // Query the memory_tags table for completeness
      const { data: memoryTags, error: memoryError } = await supabase
        .from('memory_tags')
        .select('tag');

      if (memoryError) {
        throw memoryError;
      }

      // Combine tags from both sources
      const allTags = [...(storyTags || []), ...(memoryTags || [])];
      
      // Count occurrences of each tag
      const tagCounts: Record<string, number> = {};
      allTags.forEach(item => {
        const tag = item.tag;
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });

      // Convert to array and sort by count
      const sortedTags: TagCount[] = Object.entries(tagCounts)
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);

      return sortedTags;
    },
  });
};

/**
 * Hook to search for tags
 */
export const useTagSearch = (query: string) => {
  return useQuery({
    queryKey: ["tags", "search", query],
    queryFn: async () => {
      if (!query || query.length < 2) return [];
      
      const { data: storyTags, error: storyError } = await supabase
        .from('story_tags')
        .select('tag')
        .ilike('tag', `%${query}%`)
        .limit(5);

      if (storyError) {
        throw storyError;
      }

      const { data: memoryTags, error: memoryError } = await supabase
        .from('memory_tags')
        .select('tag')
        .ilike('tag', `%${query}%`)
        .limit(5);

      if (memoryError) {
        throw memoryError;
      }

      // Combine and deduplicate
      const allTags = [...(storyTags || []), ...(memoryTags || [])];
      const uniqueTags = Array.from(new Set(allTags.map(item => item.tag)));
      
      return uniqueTags.map(tag => ({ tag }));
    },
    enabled: query.length >= 2,
  });
};
