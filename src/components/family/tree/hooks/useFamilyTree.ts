
import { useState, useCallback, useRef } from 'react';
import { useNodesState, useEdgesState, Connection, Edge, Node, ReactFlowInstance, addEdge } from '@xyflow/react';
import { v4 as uuidv4 } from 'uuid';
import { useTreeLayout } from './useTreeLayout';
import { useTreeOperations } from './useTreeOperations';
import { useTreeExport } from './useTreeExport';

interface UseFamilyTreeProps {
  familyId: string;
  initialMembers?: any[];
}

export function useFamilyTree({ familyId, initialMembers = [] }: UseFamilyTreeProps) {
  // Convert initial members to nodes if provided
  const initialNodes = initialMembers?.map((member) => ({
    id: member.id || uuidv4(),
    type: 'familyMember',
    position: member.position || { x: 0, y: 0 },
    data: {
      full_name: member.full_name || 'New Member',
      birth_date: member.birth_date || null,
      death_date: member.death_date || null,
      role: member.role || 'unknown',
      bio: member.bio || '',
      image: member.image || null,
    },
    draggable: true,
  })) || [];

  // State for nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const reactFlowInstanceRef = useRef<ReactFlowInstance | null>(null);

  // Delegate to specialized hooks
  const { autoLayoutTree } = useTreeLayout({ nodes, setNodes, edges });
  const { 
    handleAddMember, 
    handleConnectMembers, 
    handleRemoveMember, 
    handleRemoveConnection 
  } = useTreeOperations({ nodes, edges, setNodes, setEdges });
  const { handleImportData } = useTreeExport({ setNodes, setEdges, autoLayoutTree });

  // Function to set the flow instance
  const setReactFlowInstance = useCallback((instance: ReactFlowInstance) => {
    reactFlowInstanceRef.current = instance;
  }, []);

  // Handle node click
  const handleNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    console.log('Node clicked:', node);
    // Additional node click handling can be implemented here
  }, []);

  // Handle connecting nodes
  const onConnect = useCallback((connection: Connection) => {
    setEdges((edges) => addEdge({
      ...connection,
      type: 'parentChild',
      animated: true,
    }, edges));
  }, [setEdges]);

  // Zoom controls
  const handleZoomIn = useCallback(() => {
    if (reactFlowInstanceRef.current) {
      reactFlowInstanceRef.current.zoomIn();
    }
  }, []);

  const handleZoomOut = useCallback(() => {
    if (reactFlowInstanceRef.current) {
      reactFlowInstanceRef.current.zoomOut();
    }
  }, []);

  const handleFitView = useCallback(() => {
    if (reactFlowInstanceRef.current) {
      reactFlowInstanceRef.current.fitView();
    }
  }, []);

  // Add multiple members at once (using file import or batch operations)
  const handleAddMembers = useCallback(() => {
    // Placeholder for adding multiple members at once
    console.log('Add multiple members functionality');
    // Implementation will depend on specific requirements
  }, []);

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setReactFlowInstance,
    handleNodeClick,
    handleAddMember,
    handleConnectMembers,
    handleRemoveMember,
    handleRemoveConnection,
    handleImportData,
    handleZoomIn,
    handleZoomOut,
    handleFitView,
    handleAddMembers,
  };
}
