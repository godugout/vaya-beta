
import { useState, useCallback } from 'react';
import { useFamilyTree } from './hooks/useFamilyTree';
import { FamilyTreeView } from './FamilyTreeView';
import { FamilyTreeDialogs } from './FamilyTreeDialogs';

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
  } = useFamilyTree({ familyId, initialMembers });

  const handleShareTree = useCallback(() => {
    setShareDialogOpen(true);
  }, []);

  return (
    <div className="h-[calc(100vh-160px)] rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden bg-gray-50 dark:bg-gray-900 relative">
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
        onConnect={() => setConnectDialogOpen(true)}
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
