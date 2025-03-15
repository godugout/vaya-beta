
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FamilyMember {
  id: string;
  data: {
    full_name: string;
  };
}

interface ConnectMembersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect: (sourceId: string, targetId: string, relationship: string) => void;
  members: FamilyMember[];
}

export const ConnectMembersDialog = ({ 
  open, 
  onOpenChange, 
  onConnect,
  members 
}: ConnectMembersDialogProps) => {
  const [connection, setConnection] = useState({
    source: '',
    target: '',
    relationship: 'parent-child',
  });

  const handleSubmit = () => {
    if (connection.source && connection.target && connection.source !== connection.target) {
      onConnect(connection.source, connection.target, connection.relationship);
      setConnection({ source: '', target: '', relationship: 'parent-child' });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect Family Members</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="source" className="text-right">
              First Person
            </Label>
            <Select
              value={connection.source}
              onValueChange={(value) => setConnection({ ...connection, source: value })}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select family member" />
              </SelectTrigger>
              <SelectContent>
                {members.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.data.full_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="relationship" className="text-right">
              Relationship
            </Label>
            <Select
              value={connection.relationship}
              onValueChange={(value) => setConnection({ ...connection, relationship: value })}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select relationship" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="parent-child">Parent-Child</SelectItem>
                <SelectItem value="spouse">Spouse</SelectItem>
                <SelectItem value="sibling">Sibling</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="target" className="text-right">
              Second Person
            </Label>
            <Select
              value={connection.target}
              onValueChange={(value) => setConnection({ ...connection, target: value })}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select family member" />
              </SelectTrigger>
              <SelectContent>
                {members.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.data.full_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!connection.source || !connection.target || connection.source === connection.target}
          >
            Connect
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
