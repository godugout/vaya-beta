
import { useEffect, useState } from 'react';
import { ReactFlow, MiniMap, Controls, Background, Panel } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useIsMobile } from '@/hooks/use-mobile';
import { FilterPanel } from './components/FilterPanel';
import { LayoutSelector } from './components/LayoutSelector';
import { FocusModeToggle } from './components/FocusModeToggle';

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
  
  return (
    <div className={`relative h-full ${getLayoutClass(layoutType)}`}>
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
        
        <Panel position="top-right" className="flex flex-col gap-2">
          <LayoutSelector layoutType={layoutType} setLayoutType={setLayoutType} />
          <FocusModeToggle focusModeEnabled={focusModeEnabled} toggleFocusMode={toggleFocusMode} />
          <FilterPanel 
            filterOpen={filterOpen}
            setFilterOpen={setFilterOpen}
            activeFilters={activeFilters}
            toggleFilter={toggleFilter}
          />
        </Panel>
      </ReactFlow>
    </div>
  );
};

const getLayoutClass = (layoutType: 'vertical' | 'horizontal' | 'radial') => {
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
