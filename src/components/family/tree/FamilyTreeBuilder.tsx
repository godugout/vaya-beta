
import { useState, useCallback, useEffect } from 'react';
import { useFamilyTree } from './hooks/useFamilyTree';
import { FamilyTreeView } from './FamilyTreeView';
import { FamilyTreeDialogs } from './FamilyTreeDialogs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { AlertTriangle } from 'lucide-react';

interface FamilyTreeBuilderProps {
  familyId: string;
  initialMembers?: any[];
}

const FamilyTreeBuilder = ({ familyId, initialMembers = [] }: FamilyTreeBuilderProps) => {
  // Dialog states
  const [addMemberDialogOpen, setAddMemberDialogOpen] = useState(false);
  const [connectDialogOpen, setConnectDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const { toast } = useToast();
  const [showSuggestion, setShowSuggestion] = useState(false);

  const {
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
  } = useFamilyTree({ familyId, initialMembers });

  const handleShareTree = useCallback(() => {
    setShareDialogOpen(true);
  }, []);

  // Suggest adding missing family members
  useEffect(() => {
    // Simple heuristic: Show suggestion if there are more than 3 members but few connections
    if (nodes.length > 3 && edges.length < nodes.length - 1) {
      setShowSuggestion(true);
    } else {
      setShowSuggestion(false);
    }
  }, [nodes, edges]);

  // Handle auto-layout when tree structure changes
  useEffect(() => {
    if (nodes.length > 0) {
      autoLayoutTree();
    }
  }, [nodes.length]); // Only re-layout when node count changes

  return (
    <div className="h-[calc(100vh-160px)] rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden bg-gray-50 dark:bg-gray-900 relative">
      {showSuggestion && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3 shadow-lg max-w-md">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <p className="text-sm text-amber-800 dark:text-amber-200">Your family tree might be missing some connections.</p>
          </div>
          <div className="flex justify-end mt-2 gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setShowSuggestion(false)}
            >
              Dismiss
            </Button>
            <Button 
              size="sm" 
              onClick={() => {
                setConnectDialogOpen(true);
                setShowSuggestion(false);
              }}
            >
              Add Connections
            </Button>
          </div>
        </div>
      )}
      
      <FamilyTreeView
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        setReactFlowInstance={setReactFlowInstance}
        onNodeClick={handleNodeClick}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onFitView={handleFitView}
        onAddMember={() => setAddMemberDialogOpen(true)}
        onOpenConnectDialog={() => setConnectDialogOpen(true)}
        onRemoveConnection={handleRemoveConnection}
        onImport={() => setImportDialogOpen(true)}
        onShare={handleShareTree}
        onRemoveMember={handleRemoveMember}
        onAddMembers={handleAddMembers}
      />
      
      <FamilyTreeDialogs
        addMemberDialogOpen={addMemberDialogOpen}
        setAddMemberDialogOpen={setAddMemberDialogOpen}
        connectDialogOpen={connectDialogOpen}
        setConnectDialogOpen={setConnectDialogOpen}
        importDialogOpen={importDialogOpen}
        setImportDialogOpen={setImportDialogOpen}
        shareDialogOpen={shareDialogOpen}
        setShareDialogOpen={setShareDialogOpen}
        onAddMember={handleAddMember}
        onConnectMembers={handleConnectMembers}
        onImportData={handleImportData}
        familyId={familyId}
        members={nodes}
      />
    </div>
  );
};

export default FamilyTreeBuilder;
