
import { useCallback } from 'react';
import { FamilyGraph, FamilyNode } from '@/utils/graphDb/familyGraphTypes';
import { familyTreeCache } from '@/utils/offline/familyTreeCache';
import { useToast } from '@/components/ui/use-toast';

export const usePersonOperations = (
  familyId: string | undefined,
  graph: FamilyGraph | null,
  setGraph: React.Dispatch<React.SetStateAction<FamilyGraph | null>>
) => {
  const { toast } = useToast();

  // Add a new person node with offline support
  const addPerson = useCallback(async (personData: Partial<FamilyNode['data']> & { full_name: string }) => {
    if (!familyId) return null;
    
    try {
      const newNode = await familyTreeCache.addNode(familyId, {
        type: 'person',
        data: personData
      });
      
      // Update local state for immediate UI update
      if (newNode && graph) {
        setGraph({
          ...graph,
          nodes: [...graph.nodes, newNode]
        });
      }
      
      return newNode;
    } catch (err) {
      console.error('Error adding person:', err);
      
      toast({
        title: "Error adding person",
        description: err instanceof Error ? err.message : "An unexpected error occurred",
        variant: "destructive"
      });
      
      return null;
    }
  }, [familyId, graph, setGraph, toast]);

  // Update a person's data with offline support
  const updatePerson = useCallback(async (
    personId: string,
    updates: Partial<FamilyNode['data']>
  ) => {
    if (!familyId) return false;
    
    try {
      const success = await familyTreeCache.updateNode(familyId, personId, updates);
      
      if (success && graph) {
        // Update local state for immediate UI update
        const updatedNodes = graph.nodes.map(node => 
          node.id === personId 
            ? { ...node, data: { ...node.data, ...updates } }
            : node
        );
        
        setGraph({
          ...graph,
          nodes: updatedNodes
        });
      }
      
      return success;
    } catch (err) {
      console.error('Error updating person:', err);
      
      toast({
        title: "Error updating person",
        description: err instanceof Error ? err.message : "An unexpected error occurred",
        variant: "destructive"
      });
      
      return false;
    }
  }, [familyId, graph, setGraph, toast]);

  // Delete a person with offline support
  const deletePerson = useCallback(async (personId: string) => {
    if (!familyId) return false;
    
    try {
      const success = await familyTreeCache.deleteNode(familyId, personId);
      
      if (success && graph) {
        // Update local state for immediate UI update
        const updatedNodes = graph.nodes.filter(node => node.id !== personId);
        const updatedEdges = graph.edges.filter(edge => 
          edge.source !== personId && edge.target !== personId
        );
        
        setGraph({
          ...graph,
          nodes: updatedNodes,
          edges: updatedEdges
        });
      }
      
      return success;
    } catch (err) {
      console.error('Error deleting person:', err);
      
      toast({
        title: "Error deleting person",
        description: err instanceof Error ? err.message : "An unexpected error occurred",
        variant: "destructive"
      });
      
      return false;
    }
  }, [familyId, graph, setGraph, toast]);

  return {
    addPerson,
    updatePerson,
    deletePerson
  };
};
