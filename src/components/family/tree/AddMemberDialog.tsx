
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddMember: (member: { full_name: string; role: string }) => void;
}

export const AddMemberDialog = ({ open, onOpenChange, onAddMember }: AddMemberDialogProps) => {
  const [formData, setFormData] = useState({
    full_name: '',
    role: 'member',
  });

  const handleSubmit = () => {
    if (formData.full_name.trim()) {
      onAddMember(formData);
      setFormData({ full_name: '', role: 'member' });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Family Member</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="full_name" className="text-right">
              Full Name
            </Label>
            <Input
              id="full_name"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="col-span-3"
              placeholder="Enter full name"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Select
              value={formData.role}
              onValueChange={(value) => setFormData({ ...formData, role: value })}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="parent">Parent</SelectItem>
                <SelectItem value="child">Child</SelectItem>
                <SelectItem value="spouse">Spouse</SelectItem>
                <SelectItem value="sibling">Sibling</SelectItem>
                <SelectItem value="member">Other Member</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!formData.full_name.trim()}>
            Add Member
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
