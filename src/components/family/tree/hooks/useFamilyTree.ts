
import { useCallback, useState, useEffect } from 'react';
import {
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  MarkerType,
} from '@xyflow/react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/components/ui/use-toast";

interface UseFamilyTreeProps {
  familyId: string;
  initialMembers?: any[];
}

export const useFamilyTree = ({ familyId, initialMembers = [] }: UseFamilyTreeProps) => {
  const { toast } = useToast();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Initialize with example data if no initial members provided
  useEffect(() => {
    if (!initialMembers || initialMembers.length === 0) {
      const exampleNodes = [
        {
          id: '1',
          type: 'familyMember',
          data: { full_name: 'John Smith', role: 'parent' },
          position: { x: 250, y: 50 },
        },
        {
          id: '2',
          type: 'familyMember',
          data: { full_name: 'Mary Smith', role: 'parent' },
          position: { x: 450, y: 50 },
        },
        {
          id: '3',
          type: 'familyMember',
          data: { full_name: 'Robert Smith', role: 'child' },
          position: { x: 200, y: 200 },
        },
        {
          id: '4',
          type: 'familyMember',
          data: { full_name: 'Sarah Smith', role: 'child' },
          position: { x: 380, y: 200 },
        },
        {
          id: '5',
          type: 'familyMember',
          data: { full_name: 'Michael Smith', role: 'child' },
          position: { x: 560, y: 200 },
        },
      ];

      const exampleEdges = [
        {
          id: 'e1-2',
          source: '1',
          target: '2',
          type: 'spouse',
          sourceHandle: 'spouse',
          targetHandle: 'spouse-target',
        },
        {
          id: 'e1-3',
          source: '1',
          target: '3',
          type: 'parentChild',
          data: { label: 'Child' },
        },
        {
          id: 'e1-4',
          source: '1',
          target: '4',
          type: 'parentChild',
          data: { label: 'Child' },
        },
        {
          id: 'e2-5',
          source: '2',
          target: '5',
          type: 'parentChild',
          data: { label: 'Child' },
        },
      ];

      setNodes(exampleNodes);
      setEdges(exampleEdges);
    } else {
      // Convert initialMembers to nodes and edges
      // This would be implemented based on your data structure
    }
  }, [initialMembers, setNodes, setEdges]);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => 
        addEdge({
          ...connection,
          type: connection.sourceHandle === 'spouse' ? 'spouse' : 'parentChild',
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 15,
            height: 15,
          },
          data: {
            label: connection.sourceHandle === 'spouse' ? 'Spouse' : 'Child',
          },
        }, eds)
      );
    },
    [setEdges]
  );

  const handleAddMember = useCallback(
    (memberData: { full_name: string; role: string }) => {
      const newNode = {
        id: uuidv4(),
        type: 'familyMember',
        data: { 
          full_name: memberData.full_name, 
          role: memberData.role
        },
        position: {
          x: Math.random() * 500 + 100,
          y: Math.random() * 200 + 100,
        },
      };
      
      setNodes((nds) => nds.concat(newNode));
      
      toast({
        title: "Member Added",
        description: `${memberData.full_name} has been added to the family tree.`,
      });
    },
    [setNodes, toast]
  );

  const handleConnectMembers = useCallback(
    (sourceId: string, targetId: string, relationship: string) => {
      const edgeId = `e${sourceId}-${targetId}`;
      
      let edgeType = 'parentChild';
      let sourceHandle = null;
      let targetHandle = null;
      let label = 'Child';
      
      if (relationship === 'spouse') {
        edgeType = 'spouse';
        sourceHandle = 'spouse';
        targetHandle = 'spouse-target';
        label = 'Spouse';
      } else if (relationship === 'sibling') {
        label = 'Sibling';
      }
      
      const newEdge = {
        id: edgeId,
        source: sourceId,
        target: targetId,
        type: edgeType,
        sourceHandle,
        targetHandle,
        data: { label },
      };
      
      setEdges((eds) => eds.concat(newEdge));
      
      toast({
        title: "Members Connected",
        description: `The family members have been connected as ${label.toLowerCase()}.`,
      });
    },
    [setEdges, toast]
  );

  const handleRemoveMember = useCallback(() => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode));
      setEdges((eds) => eds.filter(
        (edge) => edge.source !== selectedNode && edge.target !== selectedNode
      ));
      
      setSelectedNode(null);
      
      toast({
        title: "Member Removed",
        description: "The family member has been removed from the tree.",
      });
    } else {
      toast({
        title: "No Member Selected",
        description: "Please select a family member to remove.",
        variant: "destructive",
      });
    }
  }, [selectedNode, setNodes, setEdges, toast]);

  const handleRemoveConnection = useCallback(() => {
    if (selectedNode) {
      // Prompt user to select which connection to remove
      toast({
        title: "Removal Helper",
        description: "Click on a connection to remove it.",
      });
    } else {
      toast({
        title: "No Member Selected",
        description: "Please select a family member first.",
        variant: "destructive",
      });
    }
  }, [selectedNode, toast]);

  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNode(node.id);
    },
    []
  );

  const handleImportData = useCallback(
    (data: any) => {
      try {
        // Process imported data, create nodes and edges
        // This is a simplified example
        if (Array.isArray(data)) {
          const newNodes = data.map((member, index) => ({
            id: member.id || uuidv4(),
            type: 'familyMember',
            data: { 
              full_name: member.full_name || member.name, 
              role: member.role || 'member'
            },
            position: {
              x: 100 + (index % 3) * 200,
              y: 100 + Math.floor(index / 3) * 150,
            },
          }));
          
          setNodes(newNodes);
          
          // Create basic edges if data includes relationships
          const newEdges: Edge[] = [];
          // Simplified, would need logic based on your data structure
          
          setEdges(newEdges);
          
          toast({
            title: "Data Imported",
            description: `Successfully imported ${newNodes.length} family members.`,
          });
        } else {
          throw new Error('Imported data is not in the expected format');
        }
      } catch (error) {
        console.error('Error importing data:', error);
        toast({
          title: "Import Failed",
          description: "The data could not be imported. Please check the format.",
          variant: "destructive",
        });
      }
    },
    [setNodes, setEdges, toast]
  );

  const handleZoomIn = useCallback(() => {
    if (reactFlowInstance) {
      reactFlowInstance.zoomIn();
    }
  }, [reactFlowInstance]);

  const handleZoomOut = useCallback(() => {
    if (reactFlowInstance) {
      reactFlowInstance.zoomOut();
    }
  }, [reactFlowInstance]);

  const handleFitView = useCallback(() => {
    if (reactFlowInstance) {
      reactFlowInstance.fitView();
    }
  }, [reactFlowInstance]);

  const handleAddMembers = useCallback(() => {
    toast({
      title: "Bulk Add Coming Soon",
      description: "The ability to add multiple members at once is coming soon!",
    });
  }, [toast]);

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setReactFlowInstance,
    handleNodeClick,
    selectedNode,
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
};
