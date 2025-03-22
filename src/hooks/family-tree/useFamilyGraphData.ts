
import { useState, useEffect, useCallback } from 'react';
import { FamilyGraph } from '@/utils/graphDb/familyGraphTypes';
import { familyTreeCache } from '@/utils/offline/familyTreeCache';
import { useToast } from '@/components/ui/use-toast';

export const useFamilyGraphData = (familyId: string | undefined) => {
  const [graph, setGraph] = useState<FamilyGraph | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
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

  return {
    graph,
    loading,
    error,
    refreshGraph: loadGraph
  };
};
