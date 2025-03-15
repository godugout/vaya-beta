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
  Node,
  Edge,
  MarkerType,
  Panel
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from "@/components/ui/button";
import { 
  ZoomIn, 
  ZoomOut, 
  Users, 
  UserPlus,
  Search,
  Share2,
  Download,
  Upload
} from "lucide-react";
import FamilyTreeNode from './tree/FamilyTreeNode';
import FamilyTreeEdge from './tree/FamilyTreeEdge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const nodeTypes = {
  familyMember: FamilyTreeNode,
};

const edgeTypes = {
  familyConnection: FamilyTreeEdge,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'familyMember',
    data: { 
      name: 'Grandpa Joe', 
      relationship: 'Grandfather',
      storyCount: 12,
      hasNewStories: true
    },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    type: 'familyMember',
    data: { 
      name: 'Grandma Rose', 
      relationship: 'Grandmother',
      storyCount: 8
    },
    position: { x: 450, y: 0 },
  },
  {
    id: '3',
    type: 'familyMember',
    data: { 
      name: 'Dad', 
      relationship: 'Father',
      storyCount: 5
    },
    position: { x: 250, y: 150 },
  },
  {
    id: '4',
    type: 'familyMember',
    data: { 
      name: 'Mom', 
      relationship: 'Mother',
      storyCount: 7
    },
    position: { x: 450, y: 150 },
  },
  {
    id: '5',
    type: 'familyMember',
    data: { 
      name: 'Me', 
      relationship: 'Self',
      storyCount: 3
    },
    position: { x: 350, y: 300 },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'familyConnection',
    sourceHandle: 'spouse',
    targetHandle: 'spouse-target',
    data: { relationship: 'Married' }
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    type: 'familyConnection',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    data: { relationship: 'Parent' }
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    type: 'familyConnection',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    data: { relationship: 'Parent' }
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    type: 'familyConnection',
    sourceHandle: 'spouse',
    targetHandle: 'spouse-target',
    data: { relationship: 'Married' }
  },
  {
    id: 'e3-5',
    source: '3',
    target: '5',
    type: 'familyConnection',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    data: { relationship: 'Parent' }
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    type: 'familyConnection',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    data: { relationship: 'Parent' }
  },
];

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
    const newNode: Node = {
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
        
        <Panel position="top-left" className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-medium">Family Tree Navigation</h3>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" onClick={handleZoomIn} title="Zoom In">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleZoomOut} title="Zoom Out">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleFitView} title="Fit View">
                <Users className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center relative">
                <Search className="h-4 w-4 text-gray-500 dark:text-gray-400 absolute left-3" />
                <Input 
                  placeholder="Search family members..."
                  className="text-sm pl-9"
                />
              </div>
              
              <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Family Member
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Family Member</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Enter name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="relationship">Relationship</Label>
                      <Input id="relationship" placeholder="E.g. Father, Sister, etc." />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddMemberOpen(false)}>Cancel</Button>
                    <Button onClick={() => handleAddMember("New Member", "Relative")}>Add Member</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleExportTree} className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};
