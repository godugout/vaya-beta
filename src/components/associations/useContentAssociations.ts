
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ContentType, ContentAssociation, RelationshipType } from "./types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

/**
 * Hook to create, fetch, and manage content associations
 */
export const useContentAssociations = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  /**
   * Create a new association between content items
   */
  const createAssociation = useMutation({
    mutationFn: async ({
      sourceType,
      sourceId,
      targetType,
      targetId,
      relationshipType,
      customRelationship,
      metadata
    }: {
      sourceType: ContentType;
      sourceId: string;
      targetType: ContentType;
      targetId: string;
      relationshipType: RelationshipType;
      customRelationship?: string;
      metadata?: Record<string, any>;
    }) => {
      const { data, error } = await supabase
        .from('content_associations')
        .insert({
          source_type: sourceType,
          source_id: sourceId,
          target_type: targetType,
          target_id: targetId,
          relationship_type: relationshipType,
          custom_relationship: customRelationship,
          created_by: (await supabase.auth.getUser()).data.user?.id,
          metadata
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content-associations'] });
      toast({
        title: "Association created",
        description: "Content items have been linked successfully."
      });
    },
    onError: (error) => {
      console.error("Error creating association:", error);
      toast({
        variant: "destructive",
        title: "Association failed",
        description: "Failed to link content items. Please try again."
      });
    }
  });

  /**
   * Delete an existing content association
   */
  const deleteAssociation = useMutation({
    mutationFn: async (associationId: string) => {
      const { error } = await supabase
        .from('content_associations')
        .delete()
        .eq('id', associationId);

      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content-associations'] });
      toast({
        title: "Association removed",
        description: "Content link has been removed successfully."
      });
    },
    onError: (error) => {
      console.error("Error deleting association:", error);
      toast({
        variant: "destructive",
        title: "Removal failed",
        description: "Failed to remove content link. Please try again."
      });
    }
  });

  /**
   * Fetch associations for a specific content item
   */
  const fetchAssociationsForContent = (contentType: ContentType, contentId: string) => {
    return useInfiniteQuery({
      queryKey: ['content-associations', contentType, contentId],
      queryFn: async ({ pageParam = 0 }) => {
        // Fetch where content is either the source or target
        const sourcePromise = supabase
          .from('content_associations')
          .select('*')
          .eq('source_type', contentType)
          .eq('source_id', contentId)
          .range(pageParam * 10, (pageParam + 1) * 10 - 1);

        const targetPromise = supabase
          .from('content_associations')
          .select('*')
          .eq('target_type', contentType)
          .eq('target_id', contentId)
          .range(pageParam * 10, (pageParam + 1) * 10 - 1);

        const [sourceResult, targetResult] = await Promise.all([sourcePromise, targetPromise]);

        if (sourceResult.error) throw sourceResult.error;
        if (targetResult.error) throw targetResult.error;

        const sourceAssociations = sourceResult.data || [];
        const targetAssociations = targetResult.data || [];
        const allAssociations = [...sourceAssociations, ...targetAssociations];

        return {
          associations: allAssociations,
          nextPage: allAssociations.length === 20 ? pageParam + 1 : undefined,
        };
      },
      getNextPageParam: (lastPage) => lastPage.nextPage,
      initialPageParam: 0,
    });
  };

  return {
    createAssociation,
    deleteAssociation,
    fetchAssociationsForContent
  };
};
