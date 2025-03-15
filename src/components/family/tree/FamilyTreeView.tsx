
import { ReactFlow, MiniMap, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import FamilyMemberNode from './FamilyMemberNode';
import SpouseEdge from './SpouseEdge';
import ParentChildEdge from './ParentChildEdge';
import { FamilyTreeControls } from './FamilyTreeControls';

const nodeTypes = {
  familyMember: FamilyMemberNode,
};

const edgeTypes = {
  spouse: SpouseEdge,
  parentChild: ParentChildEdge,
};

interface FamilyTreeViewProps {
  nodes: any[];
  edges: any[];
  onNodesChange: any;
  onEdgesChange: any;
  onConnect: any;
  setReactFlowInstance: (instance: any) => void;
  onNodeClick: (event: React.MouseEvent, node: any) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitView: () => void;
  onAddMember: () => void;
  onOpenConnectDialog: () => void;
  onRemoveConnection: () => void;
  onImport: () => void;
  onShare: () => void;
  onRemoveMember: () => void;
  onAddMembers: () => void;
}

export const FamilyTreeView = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  setReactFlowInstance,
  onNodeClick,
  onZoomIn,
  onZoomOut,
  onFitView,
  onAddMember,
  onOpenConnectDialog,
  onRemoveConnection,
  onImport,
  onShare,
  onRemoveMember,
  onAddMembers,
}: FamilyTreeViewProps) => {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onInit={setReactFlowInstance}
      onNodeClick={onNodeClick}
      fitView
      className="bg-gray-50 dark:bg-gray-900"
    >
      <Controls showInteractive={false} className="react-flow__controls" />
      <MiniMap
        nodeStrokeWidth={3}
        zoomable
        pannable
        className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-md"
      />
      <Background color="#aaa" gap={16} />
      
      <FamilyTreeControls 
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        onFitView={onFitView}
        onAddMember={onAddMember}
        onConnect={onOpenConnectDialog}
        onRemoveConnection={onRemoveConnection}
        onImport={onImport}
        onShare={onShare}
        onRemoveMember={onRemoveMember}
        onAddMembers={onAddMembers}
      />
    </ReactFlow>
  );
};
