
import { useCallback } from 'react';
import { Edge } from '@xyflow/react';
import { useToast } from '@/components/ui/use-toast';

interface UseConnectionOperationsProps {
  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}

export function useConnectionOperations({ edges, setEdges }: UseConnectionOperationsProps) {
  const { toast } = useToast();

  const formatRelationshipLabel = (relationship: string): string => {
    switch (relationship) {
      case 'parent':
        return 'Parent';
      case 'child':
        return 'Child';
      case 'spouse':
        return 'Spouse';
      case 'sibling':
        return 'Sibling';
      default:
        return relationship.charAt(0).toUpperCase() + relationship.slice(1);
    }
  };

  const handleConnectMembers = useCallback((sourceId: string, targetId: string, relationship: string) => {
    const connectionExists = edges.some(
      edge => (edge.source === sourceId && edge.target === targetId) || 
              (edge.source === targetId && edge.target === sourceId)
    );
    
    if (connectionExists) {
      toast({
        title: "Connection already exists",
        description: "These family members are already connected.",
        variant: "destructive"
      });
      return;
    }
    
    let source = sourceId;
    let target = targetId;
    let type = 'parentChild';
    let edgeType = 'default';
    
    if (relationship === 'spouse') {
      type = 'spouse';
      edgeType = 'spouse';
    } else if (relationship === 'child') {
      [source, target] = [targetId, sourceId];
    }
    
    const newEdge = {
      id: `${source}-${target}-${relationship}`,
      source,
      target,
      type: edgeType,
      animated: true,
      data: { 
        relationship: formatRelationshipLabel(relationship),
        sharedStories: 0,
        isDirectLineage: false
      }
    };
    
    setEdges(edges => [...edges, newEdge]);
    
    toast({
      title: "Connection Created",
      description: `Family relationship has been established.`,
    });
  }, [edges, setEdges, toast]);

  const handleRemoveConnection = useCallback((edgeId?: string) => {
    const idToRemove = edgeId || (edges.length > 0 ? edges[edges.length - 1].id : null);
    
    if (!idToRemove) {
      toast({
        title: "No connection to remove",
        description: "There are no connections to remove.",
        variant: "destructive"
      });
      return;
    }
    
    setEdges(edges => edges.filter(e => e.id !== idToRemove));
    
    toast({
      title: "Connection Removed",
      description: "The family relationship has been removed.",
    });
  }, [edges, setEdges, toast]);

  return {
    handleConnectMembers,
    handleRemoveConnection
  };
}
