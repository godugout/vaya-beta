
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { ZoomIn, ZoomOut, Move, UserPlus, FileDown, UploadCloud, Plus } from "lucide-react";

interface AddMemberDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onAddMember: (name: string, relationship: string) => void;
}

const AddMemberDialog = ({ isOpen, setIsOpen, onAddMember }: AddMemberDialogProps) => {
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("Family Member");

  const handleSubmit = () => {
    if (name.trim()) {
      onAddMember(name, relationship);
      setName("");
      setRelationship("Family Member");
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle>Add Family Member</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="member-name">Name</Label>
            <Input 
              id="member-name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Enter name"
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="relationship">Relationship</Label>
            <Select value={relationship} onValueChange={setRelationship}>
              <SelectTrigger id="relationship" className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select relationship" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                <SelectItem value="Family Member">Family Member</SelectItem>
                <SelectItem value="Parent">Parent</SelectItem>
                <SelectItem value="Child">Child</SelectItem>
                <SelectItem value="Sibling">Sibling</SelectItem>
                <SelectItem value="Spouse">Spouse</SelectItem>
                <SelectItem value="Grandparent">Grandparent</SelectItem>
                <SelectItem value="Uncle/Aunt">Uncle/Aunt</SelectItem>
                <SelectItem value="Cousin">Cousin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!name.trim()}>Add Member</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface FamilyTreeControlPanelProps {
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleFitView: () => void;
  isAddMemberOpen: boolean;
  setIsAddMemberOpen: (isOpen: boolean) => void;
  handleAddMember: (name: string, relationship: string) => void;
  handleExportTree: () => void;
  onOpenUploadDialog: () => void;
}

export const FamilyTreeControlPanel = ({
  handleZoomIn,
  handleZoomOut,
  handleFitView,
  isAddMemberOpen,
  setIsAddMemberOpen,
  handleAddMember,
  handleExportTree,
  onOpenUploadDialog
}: FamilyTreeControlPanelProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-2 bg-gray-800/80 p-2 rounded-lg border border-gray-700 backdrop-blur-sm">
      <div className="flex gap-1">
        <Button variant="ghost" size="icon" onClick={handleZoomIn} title="Zoom In">
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleZoomOut} title="Zoom Out">
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleFitView} title="Fit View">
          <Move className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="w-px h-7 bg-gray-700 mx-1 hidden md:block" />
      
      <div className="flex gap-1">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsAddMemberOpen(true)}
          className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-gray-700"
        >
          <UserPlus className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Add Member</span>
          <span className="sm:hidden">Add</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onOpenUploadDialog}
          className="bg-gradient-to-r from-green-600/10 to-teal-600/10 border-gray-700"
        >
          <UploadCloud className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Upload Data</span>
          <span className="sm:hidden">Upload</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportTree}
          className="bg-gray-700/30 border-gray-700"
        >
          <FileDown className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Export</span>
        </Button>
      </div>
      
      <AddMemberDialog
        isOpen={isAddMemberOpen}
        setIsOpen={setIsAddMemberOpen}
        onAddMember={handleAddMember}
      />
    </div>
  );
};
