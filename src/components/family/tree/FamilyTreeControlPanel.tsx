
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
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface FamilyTreeControlPanelProps {
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleFitView: () => void;
  isAddMemberOpen: boolean;
  setIsAddMemberOpen: (open: boolean) => void;
  handleAddMember: (name: string, relationship: string) => void;
  handleExportTree: () => void;
}

export const FamilyTreeControlPanel = ({
  handleZoomIn,
  handleZoomOut,
  handleFitView,
  isAddMemberOpen,
  setIsAddMemberOpen,
  handleAddMember,
  handleExportTree
}: FamilyTreeControlPanelProps) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
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
    </div>
  );
};
