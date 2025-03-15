
import { useCallback } from 'react';
import { Node, Edge } from '@xyflow/react';
import { v4 as uuidv4 } from 'uuid';

interface UseTreeOperationsProps {
  nodes: Node[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}

export function useTreeOperations({ nodes, edges, setNodes, setEdges }: UseTreeOperationsProps) {
  // Add a new family member
  const handleAddMember = useCallback((memberData: { full_name: string; role: string }) => {
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
        birth_date: null,
        death_date: null,
        bio: '',
        image: null,
      },
      draggable: true,
    };
    
    setNodes(nodes => [...nodes, newNode]);
  }, [setNodes]);

  // Connect family members with a relationship
  const handleConnectMembers = useCallback((sourceId: string, targetId: string, relationship: string) => {
    // Check if connection already exists
    const connectionExists = edges.some(
      edge => (edge.source === sourceId && edge.target === targetId) || 
              (edge.source === targetId && edge.target === sourceId)
    );
    
    if (connectionExists) {
      console.log('Connection already exists');
      return;
    }
    
    // Create appropriate edge based on relationship
    const newEdge = {
      id: `${sourceId}-${targetId}-${relationship}`,
      source: sourceId,
      target: targetId,
      type: relationship === 'spouse' ? 'spouse' : 'parentChild',
      animated: true,
      data: { relationship }
    };
    
    setEdges(edges => [...edges, newEdge]);
  }, [edges, setEdges]);

  // Remove a family member
  const handleRemoveMember = useCallback(() => {
    // For simplicity, we'll remove the last added member
    // In a real app, you'd want to use selected nodes instead
    if (nodes.length === 0) return;
    
    const nodeToRemove = nodes[nodes.length - 1];
    
    // Remove the node
    setNodes(nodes => nodes.filter(n => n.id !== nodeToRemove.id));
    
    // Remove any connected edges
    setEdges(edges => edges.filter(
      e => e.source !== nodeToRemove.id && e.target !== nodeToRemove.id
    ));
  }, [nodes, setNodes, setEdges]);

  // Remove a connection between members
  const handleRemoveConnection = useCallback(() => {
    // For simplicity, we'll remove the last added edge
    // In a real app, you'd want to use selected edges instead
    if (edges.length === 0) return;
    
    const edgeToRemove = edges[edges.length - 1];
    setEdges(edges => edges.filter(e => e.id !== edgeToRemove.id));
  }, [edges, setEdges]);

  return {
    handleAddMember,
    handleConnectMembers,
    handleRemoveMember,
    handleRemoveConnection
  };
}
