
import { useCallback } from 'react';
import { Node, Edge } from '@xyflow/react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/components/ui/use-toast';

interface UseTreeOperationsProps {
  nodes: Node[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}

export function useTreeOperations({ nodes, edges, setNodes, setEdges }: UseTreeOperationsProps) {
  const { toast } = useToast();

  // Add a new family member
  const handleAddMember = useCallback((memberData: { 
    full_name: string; 
    role: string;
    birthdate?: string; 
    bio?: string;
    avatar_url?: string;
  }) => {
    const newNode = {
      id: uuidv4(),
      type: 'familyMember',
      position: { 
        x: Math.random() * 400, 
        y: Math.random() * 400 
      },
      data: {
        full_name: memberData.full_name,
        role: memberData.role,
        birthdate: memberData.birthdate || null,
        bio: memberData.bio || '',
        avatar_url: memberData.avatar_url || null,
        storyCount: 0,
        hasNewStories: false,
      },
      draggable: true,
    };
    
    setNodes(nodes => [...nodes, newNode]);
    
    toast({
      title: "Family Member Added",
      description: `${memberData.full_name} has been added to your family tree.`,
    });
    
    return newNode.id;
  }, [setNodes, toast]);

  // Connect family members with a relationship
  const handleConnectMembers = useCallback((sourceId: string, targetId: string, relationship: string) => {
    // Check if connection already exists
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
    
    // Determine relationship type and direction
    let source = sourceId;
    let target = targetId;
    let type = 'parentChild';
    let edgeType = 'default';
    
    if (relationship === 'spouse') {
      type = 'spouse';
      edgeType = 'spouse';
    } else if (relationship === 'child') {
      // Swap source and target for parent-child relationship
      [source, target] = [targetId, sourceId];
    }
    
    // Create appropriate edge based on relationship
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

  // Format relationship label for display
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

  // Remove a family member
  const handleRemoveMember = useCallback((nodeId?: string) => {
    // If no nodeId provided, remove the last added member
    const idToRemove = nodeId || (nodes.length > 0 ? nodes[nodes.length - 1].id : null);
    
    if (!idToRemove) {
      toast({
        title: "No member to remove",
        description: "There are no family members to remove.",
        variant: "destructive"
      });
      return;
    }
    
    // Get member name for notification
    const memberToRemove = nodes.find(n => n.id === idToRemove);
    const memberName = memberToRemove?.data?.full_name || 'Family member';
    
    // Remove the node
    setNodes(nodes => nodes.filter(n => n.id !== idToRemove));
    
    // Remove any connected edges
    setEdges(edges => edges.filter(
      e => e.source !== idToRemove && e.target !== idToRemove
    ));
    
    toast({
      title: "Family Member Removed",
      description: `${memberName} has been removed from the family tree.`,
    });
  }, [nodes, setNodes, setEdges, toast]);

  // Remove a connection between members
  const handleRemoveConnection = useCallback((edgeId?: string) => {
    // If no edgeId provided, remove the last added edge
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

  // Update node data with story information
  const updateNodeStoryCount = useCallback((nodeId: string, storyCount: number, hasNewStories: boolean = false) => {
    setNodes(nodes => 
      nodes.map(node => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              storyCount,
              hasNewStories
            }
          };
        }
        return node;
      })
    );
  }, [setNodes]);

  // Update edge with shared story information
  const updateEdgeSharedStories = useCallback((sourceId: string, targetId: string, sharedCount: number) => {
    setEdges(edges => 
      edges.map(edge => {
        if ((edge.source === sourceId && edge.target === targetId) || 
            (edge.source === targetId && edge.target === sourceId)) {
          return {
            ...edge,
            data: {
              ...edge.data,
              sharedStories: sharedCount
            }
          };
        }
        return edge;
      })
    );
  }, [setEdges]);

  // Add multiple members at once (using file import or batch operations)
  const handleAddMembers = useCallback((members: any[]) => {
    if (!members.length) return;
    
    const newNodes = members.map(member => ({
      id: member.id || uuidv4(),
      type: 'familyMember',
      position: member.position || { x: Math.random() * 400, y: Math.random() * 400 },
      data: {
        full_name: member.full_name || 'Unknown',
        role: member.role || '',
        birthdate: member.birthdate || null,
        bio: member.bio || '',
        avatar_url: member.avatar_url || null,
        storyCount: member.storyCount || 0,
        hasNewStories: member.hasNewStories || false,
      },
      draggable: true,
    }));
    
    setNodes(nodes => [...nodes, ...newNodes]);
    
    toast({
      title: "Multiple Members Added",
      description: `Added ${members.length} family members to the tree.`,
    });
  }, [setNodes, toast]);

  return {
    handleAddMember,
    handleConnectMembers,
    handleRemoveMember,
    handleRemoveConnection,
    updateNodeStoryCount,
    updateEdgeSharedStories,
    handleAddMembers
  };
}
