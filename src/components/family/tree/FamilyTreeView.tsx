
import { useEffect, useState, ReactNode } from 'react';
import { ReactFlow, MiniMap, Controls, Background, Panel } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useIsMobile } from '@/hooks/use-mobile';
import { FilterPanel } from './components/FilterPanel';
import { LayoutSelector } from './components/LayoutSelector';
import { FocusModeToggle } from './components/FocusModeToggle';
import { nodeTypes, edgeTypes } from './familyTreeConfig';
import { PatternBackground } from '@/components/ui/pattern-background';
import { cn } from '@/lib/utils';

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
  onAddMember?: () => void;
  onOpenConnectDialog?: () => void;
  onRemoveConnection?: () => void;
  onImport?: () => void;
  onShare?: () => void;
  onRemoveMember?: () => void;
  onAddMembers?: () => void;
  className?: string;
  children?: ReactNode;
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
  className,
  children,
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
    <PatternBackground 
      pattern="sanskrit" 
      size="lg" 
      opacity="light" 
      className={cn(`relative h-full ${getLayoutClass(layoutType)}`, className)}
    >
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
        className="bg-gray-50/30 dark:bg-gray-900/50 rounded-xl backdrop-blur-sm"
      >
        <Controls 
          showInteractive={false} 
          className="bg-white/90 dark:bg-gray-800/90 border border-gray-300 dark:border-gray-700 shadow-md rounded-xl" 
        />
        <MiniMap
          nodeStrokeWidth={3}
          zoomable
          pannable
          className="bg-white/90 dark:bg-gray-800/90 border border-gray-300 dark:border-gray-700 shadow-md rounded-xl hidden md:block"
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
        
        {children}
      </ReactFlow>
    </PatternBackground>
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
