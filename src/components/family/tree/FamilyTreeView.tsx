
import { useEffect, useState } from 'react';
import { ReactFlow, MiniMap, Controls, Background, Panel } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import FamilyMemberNode from './FamilyMemberNode';
import SpouseEdge from './SpouseEdge';
import ParentChildEdge from './ParentChildEdge';
import FamilyTreeEdge from './FamilyTreeEdge';
import { FamilyTreeControls } from './FamilyTreeControls';
import { Button } from '@/components/ui/button';
import { Filter, Layout, ZoomIn, User, Users, Laptop, Smartphone } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';

const nodeTypes = {
  familyMember: FamilyMemberNode,
};

const edgeTypes = {
  spouse: SpouseEdge,
  parentChild: ParentChildEdge,
  familyConnection: FamilyTreeEdge,
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
  const isMobile = useIsMobile();
  const [layoutType, setLayoutType] = useState<'vertical' | 'horizontal' | 'radial'>('vertical');
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [focusModeEnabled, setFocusModeEnabled] = useState(false);
  
  const toggleFocusMode = () => {
    setFocusModeEnabled(!focusModeEnabled);
  };
  
  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };
  
  useEffect(() => {
    if (isMobile) {
      setLayoutType('vertical');
    }
  }, [isMobile]);
  
  const getLayoutClass = () => {
    switch (layoutType) {
      case 'horizontal':
        return 'horizontal-tree';
      case 'radial':
        return 'radial-tree';
      case 'vertical':
      default:
        return 'vertical-tree';
    }
  };
  
  return (
    <div className={`relative h-full ${getLayoutClass()}`}>
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
        minZoom={0.2}
        maxZoom={2}
        className="bg-gray-50 dark:bg-gray-900"
      >
        <Controls showInteractive={false} className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-md" />
        <MiniMap
          nodeStrokeWidth={3}
          zoomable
          pannable
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-md hidden md:block"
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
        
        <Panel position="top-right" className="flex flex-col gap-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold mb-2 flex items-center">
              <Layout className="w-4 h-4 mr-1" /> Layout
            </h3>
            <div className="flex flex-col gap-2">
              <Button 
                size="sm" 
                variant={layoutType === 'vertical' ? "default" : "outline"}
                className="flex items-center justify-start"
                onClick={() => setLayoutType('vertical')}
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Vertical
              </Button>
              <Button 
                size="sm" 
                variant={layoutType === 'horizontal' ? "default" : "outline"}
                className="flex items-center justify-start"
                onClick={() => setLayoutType('horizontal')}
              >
                <Laptop className="w-4 h-4 mr-2" />
                Horizontal
              </Button>
              <Button 
                size="sm" 
                variant={layoutType === 'radial' ? "default" : "outline"}
                className="flex items-center justify-start"
                onClick={() => setLayoutType('radial')}
              >
                <Users className="w-4 h-4 mr-2" />
                Radial
              </Button>
            </div>
          </div>
          
          <Button 
            variant={focusModeEnabled ? "default" : "outline"}
            className="flex items-center justify-center gap-2"
            onClick={toggleFocusMode}
          >
            <User className="w-4 h-4" />
            {focusModeEnabled ? "Exit Focus Mode" : "Focus Mode"}
          </Button>
          
          <Collapsible open={filterOpen} onOpenChange={setFilterOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="flex items-center justify-center gap-2 w-full">
                <Filter className="w-4 h-4" />
                Filters
                {activeFilters.length > 0 && (
                  <Badge variant="destructive" className="ml-2">{activeFilters.length}</Badge>
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 mt-2 border border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold mb-2">Filter By</h3>
                <div className="space-y-2">
                  <Button 
                    size="sm" 
                    variant={activeFilters.includes('stories') ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => toggleFilter('stories')}
                  >
                    Has Stories
                  </Button>
                  <Button 
                    size="sm" 
                    variant={activeFilters.includes('direct') ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => toggleFilter('direct')}
                  >
                    Direct Family
                  </Button>
                  <Button 
                    size="sm" 
                    variant={activeFilters.includes('recent') ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => toggleFilter('recent')}
                  >
                    Recently Added
                  </Button>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Panel>
      </ReactFlow>
    </div>
  );
};
