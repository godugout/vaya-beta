
import { useCallback } from 'react';
import { FamilyGraph, FamilyRelationshipType } from '@/utils/graphDb/familyGraphTypes';
import { familyTreeCache } from '@/utils/offline/familyTreeCache';
import { useToast } from '@/components/ui/use-toast';

export const useRelationshipOperations = (
  familyId: string | undefined,
  graph: FamilyGraph | null,
  setGraph: React.Dispatch<React.SetStateAction<FamilyGraph | null>>
) => {
  const { toast } = useToast();

  // Add a relationship edge with offline support
  const addRelationship = useCallback(async (
    sourceId: string,
    targetId: string,
    type: FamilyRelationshipType,
    metadata: Record<string, any> = {}
  ) => {
    if (!familyId) return null;
    
    try {
      const newEdge = await familyTreeCache.addEdge(familyId, {
        source: sourceId,
        target: targetId,
        type,
        metadata
      });
      
      // Update local state for immediate UI update
      if (newEdge && graph) {
        setGraph({
          ...graph,
          edges: [...graph.edges, newEdge]
        });
      }
      
      return newEdge;
    } catch (err) {
      console.error('Error adding relationship:', err);
      
      toast({
        title: "Error adding relationship",
        description: err instanceof Error ? err.message : "An unexpected error occurred",
        variant: "destructive"
      });
      
      return null;
    }
  }, [familyId, graph, setGraph, toast]);

  return {
    addRelationship
  };
};
