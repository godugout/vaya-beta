
import { AddMemberDialog } from './AddMemberDialog';
import { ConnectMembersDialog } from './ConnectMembersDialog';
import { ImportDataDialog } from './ImportDataDialog';
import { ShareTreeDialog } from './ShareTreeDialog';

interface FamilyTreeDialogsProps {
  addMemberDialogOpen: boolean;
  setAddMemberDialogOpen: (open: boolean) => void;
  connectDialogOpen: boolean;
  setConnectDialogOpen: (open: boolean) => void;
  importDialogOpen: boolean;
  setImportDialogOpen: (open: boolean) => void;
  shareDialogOpen: boolean;
  setShareDialogOpen: (open: boolean) => void;
  onAddMember: (member: { full_name: string; role: string }) => void;
  onConnectMembers: (sourceId: string, targetId: string, relationship: string) => void;
  onImportData: (data: any) => void;
  familyId: string;
  members: any[];
}

export const FamilyTreeDialogs = ({
  addMemberDialogOpen,
  setAddMemberDialogOpen,
  connectDialogOpen,
  setConnectDialogOpen,
  importDialogOpen,
  setImportDialogOpen,
  shareDialogOpen,
  setShareDialogOpen,
  onAddMember,
  onConnectMembers,
  onImportData,
  familyId,
  members,
}: FamilyTreeDialogsProps) => {
  return (
    <>
      <AddMemberDialog 
        open={addMemberDialogOpen} 
        onOpenChange={setAddMemberDialogOpen} 
        onAddMember={onAddMember} 
      />
      
      <ConnectMembersDialog 
        open={connectDialogOpen} 
        onOpenChange={setConnectDialogOpen} 
        onConnect={onConnectMembers}
        members={members}
      />
      
      <ImportDataDialog 
        open={importDialogOpen} 
        onOpenChange={setImportDialogOpen} 
        onImportData={onImportData} 
      />
      
      <ShareTreeDialog 
        open={shareDialogOpen} 
        onOpenChange={setShareDialogOpen}
        familyId={familyId}
      />
    </>
  );
}
