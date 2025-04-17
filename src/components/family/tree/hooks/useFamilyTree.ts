import { useState, useCallback, useRef, useEffect } from 'react';
import { useNodesState, useEdgesState, Connection, Edge, Node, ReactFlowInstance, addEdge } from '@xyflow/react';
import { v4 as uuidv4 } from 'uuid';
import { useTreeLayout } from './useTreeLayout';
import { useTreeOperations } from './useTreeOperations';
import { useTreeExport } from './useTreeExport';
import { useIsMobile } from '@/hooks/use-mobile';

interface UseFamilyTreeProps {
  familyId: string;
  initialMembers?: any[];
}

export function useFamilyTree({ familyId, initialMembers = [] }: UseFamilyTreeProps) {
  const { isMobile } = useIsMobile();
  
  // Convert initial members to nodes if provided
  const initialNodes = initialMembers?.map((member) => ({
    id: member.id || uuidv4(),
    type: 'familyMember',
    position: member.position || { x: 0, y: 0 },
    data: {
      full_name: member.profiles?.full_name || member.full_name || 'New Member',
      birth_date: member.birth_date || null,
      death_date: member.death_date || null,
      role: member.role || 'unknown',
      bio: member.bio || '',
      avatar_url: member.profiles?.avatar_url || member.avatar_url || null,
      storyCount: 0, // This would come from actual data in production
      hasNewStories: false,
    },
    draggable: true,
  })) || [];

  // State for nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const reactFlowInstanceRef = useRef<ReactFlowInstance | null>(null);
  const [layoutType, setLayoutType] = useState<'vertical' | 'horizontal' | 'radial'>(
    isMobile ? 'vertical' : 'horizontal'
  );

  // Delegate to specialized hooks
  const { autoLayoutTree } = useTreeLayout({ nodes, setNodes, edges });
  const { 
    handleAddMember, 
    handleConnectMembers, 
    handleRemoveMember, 
    handleRemoveConnection,
    updateNodeStoryCount,
    updateEdgeSharedStories,
    handleAddMembers
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
    // Determine relationship type based on the sourceHandle
    const relationshipType = connection.sourceHandle === 'spouse' ? 'spouse' : 'parentChild';
    
    setEdges((edges) => addEdge({
      ...connection,
      type: relationshipType,
      animated: true,
      data: {
        relationship: relationshipType === 'spouse' ? 'Spouse' : 'Parent',
        sharedStories: 0,
        isDirectLineage: false
      }
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

  // Apply auto-layout when nodes or edges change
  useEffect(() => {
    if (nodes.length > 0) {
      autoLayoutTree(layoutType);
    }
  }, [layoutType, autoLayoutTree, nodes.length]);

  // Update layout type based on device type
  useEffect(() => {
    setLayoutType(isMobile ? 'vertical' : 'horizontal');
  }, [isMobile]);

  // Load family stories and update node indicators
  useEffect(() => {
    // This would be a real API call in production
    const loadFamilyStories = async () => {
      // Simulate story data for demonstration
      const storyData = {
        // Map of member ID to story count
        memberStories: {
          [nodes[0]?.id]: 5,
          [nodes[1]?.id]: 2,
          [nodes[2]?.id]: 8,
        },
        // Map of connection (source-target) to shared story count
        sharedStories: {
          [`${nodes[0]?.id}-${nodes[1]?.id}`]: 3,
        }
      };
      
      // Update nodes with story counts
      Object.entries(storyData.memberStories).forEach(([nodeId, count]) => {
        updateNodeStoryCount(nodeId, count, count > 3);
      });
      
      // Update edges with shared story counts
      Object.entries(storyData.sharedStories).forEach(([connection, count]) => {
        const [sourceId, targetId] = connection.split('-');
        updateEdgeSharedStories(sourceId, targetId, count);
      });
    };
    
    if (nodes.length > 0) {
      loadFamilyStories();
    }
  }, [nodes.length]); // Only run when nodes are first loaded

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
    autoLayoutTree,
    updateNodeStoryCount,
    updateEdgeSharedStories,
    layoutType,
    setLayoutType
  };
}
