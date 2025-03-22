
import { useState, useEffect, useCallback } from 'react';
import { FamilyGraph, FamilyNode, FamilyEdge } from '@/utils/graphDb/familyGraphTypes';
import { familyTreeCache } from '@/utils/offline/familyTreeCache';
import { useOfflineOperations } from './useOfflineOperations';
import { useToast } from '@/components/ui/use-toast';

export const useFamilyTreeCache = (familyId: string | undefined) => {
  const [graph, setGraph] = useState<FamilyGraph | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { queueOperation, isOnline } = useOfflineOperations();
  const { toast } = useToast();

  // Load the family graph from cache or server
  const loadGraph = useCallback(async () => {
    if (!familyId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const result = await familyTreeCache.getFamilyGraph(familyId);
      setGraph(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      console.error('Error loading family graph:', err);
      
      toast({
        title: "Error loading family tree",
        description: err instanceof Error ? err.message : "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [familyId, toast]);

  // Initial load
  useEffect(() => {
    loadGraph();
  }, [loadGraph]);

  // Add a new person node with offline support
  const addPerson = useCallback(async (personData: Partial<FamilyNode['data']>) => {
    if (!familyId) return null;
    
    try {
      const newNode = await familyTreeCache.addNode(familyId, {
        type: 'person',
        position: { x: 0, y: 0 }, // Default position, should be calculated based on graph layout
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
  }, [familyId, graph, toast]);

  // Add a relationship edge with offline support
  const addRelationship = useCallback(async (
    sourceId: string,
    targetId: string,
    type: string,
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
  }, [familyId, graph, toast]);

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
  }, [familyId, graph, toast]);

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
  }, [familyId, graph, toast]);

  return {
    graph,
    loading,
    error,
    refreshGraph: loadGraph,
    addPerson,
    addRelationship,
    updatePerson,
    deletePerson,
    isOnline
  };
};
