
import { Button } from "@/components/ui/button";
import { 
  ZoomIn, 
  ZoomOut, 
  UsersRound, 
  UserPlus, 
  Link, 
  Share2, 
  FileUp, 
  FilePlus, 
  Trash,
  Unlink
} from "lucide-react";

interface FamilyTreeControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitView: () => void;
  onAddMember: () => void;
  onConnect: () => void;
  onRemoveConnection: () => void;
  onImport: () => void;
  onShare: () => void;
  onRemoveMember: () => void;
  onAddMembers: () => void;
}

export const FamilyTreeControls = ({
  onZoomIn,
  onZoomOut,
  onFitView,
  onAddMember,
  onConnect,
  onRemoveConnection,
  onImport,
  onShare,
  onRemoveMember,
  onAddMembers
}: FamilyTreeControlsProps) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm absolute left-4 top-4 z-10">
      <div className="flex flex-col space-y-2">
        <div className="mb-2 pb-2 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium mb-1">View</h3>
          <div className="flex space-x-1">
            <Button variant="outline" size="icon" onClick={onZoomIn} title="Zoom In">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={onZoomOut} title="Zoom Out">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={onFitView} title="Fit View">
              <UsersRound className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="mb-2 pb-2 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium mb-1">Edit</h3>
          <div className="flex space-x-1">
            <Button variant="outline" size="icon" onClick={onAddMember} title="Add Member">
              <UserPlus className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={onAddMembers} title="Add Multiple Members">
              <FilePlus className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={onRemoveMember} title="Remove Member">
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="mb-2 pb-2 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium mb-1">Connections</h3>
          <div className="flex space-x-1">
            <Button variant="outline" size="icon" onClick={onConnect} title="Connect Members">
              <Link className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={onRemoveConnection} title="Remove Connection">
              <Unlink className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-1">Data</h3>
          <div className="flex space-x-1">
            <Button variant="outline" size="icon" onClick={onImport} title="Import Data">
              <FileUp className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={onShare} title="Share Tree">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
