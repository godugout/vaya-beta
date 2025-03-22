
import { useState, useEffect, useCallback } from 'react';
import { familyGraphDb } from '@/utils/graphDb/familyGraphService';
import { FamilyGraph, FamilyNode, FamilyEdge, GraphQueryOptions, FamilyRelationshipType } from '@/utils/graphDb/familyGraphTypes';

export function useFamilyGraph(familyId: string | undefined) {
  const [graph, setGraph] = useState<FamilyGraph | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);

  // Fetch the family graph
  const fetchGraph = useCallback(async () => {
    if (!familyId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const result = await familyGraphDb.getFamilyGraph(familyId);
      setGraph(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      console.error('Error fetching family graph:', err);
    } finally {
      setLoading(false);
    }
  }, [familyId]);

  // Initial fetch
  useEffect(() => {
    fetchGraph();
  }, [fetchGraph]);

  // Add a new person to the graph
  const addPerson = useCallback(async (personData: Partial<FamilyNode['data']>) => {
    if (!familyId) return null;
    try {
      const result = await familyGraphDb.addPerson(familyId, personData);
      if (result) {
        // Update local state for immediate UI update
        setGraph(prevGraph => {
          if (!prevGraph) return null;
          return {
            ...prevGraph,
            nodes: [...prevGraph.nodes, result]
          };
        });
      }
      return result;
    } catch (err) {
      console.error('Error adding person:', err);
      return null;
    }
  }, [familyId]);

  // Add a relationship between two people
  const addRelationship = useCallback(async (
    sourceId: string, 
    targetId: string, 
    type: FamilyRelationshipType,
    metadata?: FamilyEdge['metadata']
  ) => {
    if (!familyId) return null;
    try {
      const result = await familyGraphDb.addRelationship(familyId, sourceId, targetId, type, metadata);
      if (result) {
        // Update local state for immediate UI update
        setGraph(prevGraph => {
          if (!prevGraph) return null;
          return {
            ...prevGraph,
            edges: [...prevGraph.edges, result]
          };
        });
      }
      return result;
    } catch (err) {
      console.error('Error adding relationship:', err);
      return null;
    }
  }, [familyId]);

  // Get ancestors of a person
  const getAncestors = useCallback((personId: string, options?: GraphQueryOptions) => {
    if (!graph) return [];
    return familyGraphDb.findAncestors(graph, personId, options);
  }, [graph]);

  // Get descendants of a person
  const getDescendants = useCallback((personId: string, options?: GraphQueryOptions) => {
    if (!graph) return [];
    return familyGraphDb.findDescendants(graph, personId, options);
  }, [graph]);

  // Get common ancestors between two people
  const getCommonAncestors = useCallback((person1Id: string, person2Id: string) => {
    if (!graph) return [];
    return familyGraphDb.findCommonAncestors(graph, person1Id, person2Id);
  }, [graph]);

  return {
    graph,
    loading,
    error,
    selectedPersonId,
    setSelectedPersonId,
    refreshGraph: fetchGraph,
    addPerson,
    addRelationship,
    getAncestors,
    getDescendants,
    getCommonAncestors
  };
}
