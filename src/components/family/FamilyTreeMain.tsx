
import { useState, useCallback } from 'react';
import { 
  ReactFlow, 
  MiniMap, 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState, 
  addEdge,
  Connection,
  MarkerType,
  Panel
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useToast } from "@/components/ui/use-toast";
import { FamilyTreeControlPanel } from './tree/FamilyTreeControlPanel';
import { initialNodes, initialEdges } from './tree/initialFamilyTreeData';
import { nodeTypes, edgeTypes } from './tree/familyTreeConfig';

export const FamilyTreeMain = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const { toast } = useToast();

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => 
        addEdge({
          ...params,
          type: 'familyConnection',
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
          data: {
            relationship: params.sourceHandle === 'spouse' ? 'Married' : 'Parent'
          }
        }, eds)
      );
    },
    [setEdges]
  );

  const handleZoomIn = () => {
    if (reactFlowInstance) {
      reactFlowInstance.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (reactFlowInstance) {
      reactFlowInstance.zoomOut();
    }
  };

  const handleFitView = () => {
    if (reactFlowInstance) {
      reactFlowInstance.fitView();
    }
  };

  const handleAddMember = (name: string, relationship: string) => {
    const newNode = {
      id: `${nodes.length + 1}`,
      type: 'familyMember',
      data: { 
        name, 
        relationship,
        storyCount: 0
      },
      position: {
        x: Math.random() * 500 + 100,
        y: Math.random() * 500 + 100,
      },
    };
    
    setNodes((nds) => nds.concat(newNode));
    setIsAddMemberOpen(false);
    
    toast({
      title: "Family Member Added",
      description: `${name} has been added to your family tree.`,
    });
  };

  const handleExportTree = () => {
    if (reactFlowInstance) {
      const flowExport = reactFlowInstance.toObject();
      const dataStr = JSON.stringify(flowExport, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = 'family-tree.json';
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }
  };

  return (
    <div className="h-[calc(100vh-160px)] md:h-[calc(100vh-200px)] rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden bg-gray-50 dark:bg-gray-900 relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onInit={setReactFlowInstance}
        fitView
      >
        <Controls showInteractive={false} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md" />
        <MiniMap
          nodeStrokeWidth={3}
          zoomable
          pannable
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md"
        />
        <Background color="#aaa" gap={16} />
        
        <Panel position="top-left" className="p-4">
          <FamilyTreeControlPanel 
            handleZoomIn={handleZoomIn}
            handleZoomOut={handleZoomOut}
            handleFitView={handleFitView}
            isAddMemberOpen={isAddMemberOpen}
            setIsAddMemberOpen={setIsAddMemberOpen}
            handleAddMember={handleAddMember}
            handleExportTree={handleExportTree}
          />
        </Panel>
      </ReactFlow>
    </div>
  );
};
