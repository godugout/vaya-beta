
import { useState, useCallback } from 'react';
import { 
  Connection,
  MarkerType,
  Panel,
  useNodesState, 
  useEdgesState, 
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useToast } from "@/components/ui/use-toast";
import { FamilyTreeControlPanel } from './tree/FamilyTreeControlPanel';
import { initialNodes, initialEdges } from './tree/initialFamilyTreeData';
import { nodeTypes, edgeTypes } from './tree/familyTreeConfig';
import { TreeUploadDialog } from './tree/TreeUploadDialog';
import { UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FamilyTreeView } from './tree/FamilyTreeView';

export const FamilyTreeMain = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
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

  const handleTreeDataParsed = (data: any) => {
    if (data.nodes && Array.isArray(data.nodes)) {
      setNodes(data.nodes);
    }
    
    if (data.edges && Array.isArray(data.edges)) {
      setEdges(data.edges);
    }
    
    // Fit view after loading new data
    setTimeout(() => {
      if (reactFlowInstance) {
        reactFlowInstance.fitView();
      }
    }, 100);
  };

  const isEmptyTree = nodes.length === 0;

  return (
    <div className="h-[calc(100vh-160px)] md:h-[calc(100vh-200px)] rounded-lg border border-gray-700 shadow-sm overflow-hidden bg-gray-900 relative">
      {isEmptyTree ? (
        <div className="h-full flex flex-col items-center justify-center p-8">
          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 max-w-md text-center">
            <UploadCloud className="w-16 h-16 mx-auto mb-4 text-blue-400 opacity-70" />
            <h3 className="text-xl font-semibold mb-2 text-white">Create Your Family Tree</h3>
            <p className="text-gray-400 mb-6">
              Upload a spreadsheet or JSON file to quickly create your family tree, or add members manually.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => setIsUploadDialogOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600"
                size="lg"
              >
                <UploadCloud className="w-4 h-4 mr-2" />
                Upload File
              </Button>
              <Button 
                onClick={() => setIsAddMemberOpen(true)}
                variant="outline"
                size="lg"
              >
                Add Manually
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <FamilyTreeView
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          setReactFlowInstance={setReactFlowInstance}
          onNodeClick={() => {}}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onFitView={handleFitView}
          className="h-full"
        >
          <Panel position="top-left" className="p-4">
            <FamilyTreeControlPanel 
              handleZoomIn={handleZoomIn}
              handleZoomOut={handleZoomOut}
              handleFitView={handleFitView}
              isAddMemberOpen={isAddMemberOpen}
              setIsAddMemberOpen={setIsAddMemberOpen}
              handleAddMember={handleAddMember}
              handleExportTree={handleExportTree}
              onOpenUploadDialog={() => setIsUploadDialogOpen(true)}
            />
          </Panel>
        </FamilyTreeView>
      )}
      
      <TreeUploadDialog
        open={isUploadDialogOpen}
        onOpenChange={setIsUploadDialogOpen}
        onDataParsed={handleTreeDataParsed}
      />
    </div>
  );
};
