
import { useState, useEffect } from 'react';
import { Connection } from '@xyflow/react';
import { useTreeLayout } from './useTreeLayout';
import { useTreeOperations } from './useTreeOperations';
import { useTreeExport } from './useTreeExport';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTreeState } from './useTreeState';
import { useTreeLayoutControls } from './useTreeLayoutControls';
import { useTreeInteractions } from './useTreeInteractions';

interface UseFamilyTreeProps {
  familyId: string;
  initialMembers?: any[];
}

export function useFamilyTree({ familyId, initialMembers = [] }: UseFamilyTreeProps) {
  const isMobile = useIsMobile();
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    reactFlowInstanceRef
  } = useTreeState(initialMembers);
  
  const [layoutType, setLayoutType] = useState<'vertical' | 'horizontal' | 'radial'>(
    isMobile ? 'vertical' : 'horizontal'
  );

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
  const { handleZoomIn, handleZoomOut, handleFitView } = useTreeLayoutControls(reactFlowInstanceRef);
  const { handleNodeClick, setReactFlowInstance } = useTreeInteractions();

  // Handle node connections
  const onConnect = (connection: Connection) => {
    const relationshipType = connection.sourceHandle === 'spouse' ? 'spouse' : 'parentChild';
    handleConnectMembers(connection.source!, connection.target!, relationshipType);
  };

  // Update layout type based on device type
  useEffect(() => {
    setLayoutType(isMobile ? 'vertical' : 'horizontal');
  }, [isMobile]);

  // Apply auto-layout when nodes or edges change
  useEffect(() => {
    if (nodes.length > 0) {
      autoLayoutTree(layoutType);
    }
  }, [layoutType, autoLayoutTree, nodes.length]);

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

