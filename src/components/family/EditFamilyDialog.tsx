import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Settings } from "lucide-react";

interface FamilyMember {
  id: string;
  user_id: string;
  role: string;
  profiles: {
    full_name: string;
    avatar_url: string | null;
  };
}

export interface Family {
  id: string;
  name: string;
  description: string | null;
  members?: FamilyMember[] | number;
  createdAt?: string;
  logoUrl?: string;
}

interface EditFamilyDialogProps {
  family: Family;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onFamilyUpdated?: () => void;
}

export function EditFamilyDialog({ family, open: externalOpen, onOpenChange: externalOnOpenChange, onFamilyUpdated }: EditFamilyDialogProps) {
  const [loading, setLoading] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: family.name,
    description: family.description || "",
  });

  const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;
  const setIsOpen = externalOnOpenChange || setInternalOpen;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('vaya_families')
        .update({
          name: formData.name,
          description: formData.description,
        })
        .eq('id', family.id);

      if (error) throw error;

      toast({
        title: "Family updated",
        description: "Your family details have been updated successfully.",
      });

      onFamilyUpdated?.();
      setIsOpen(false);
    } catch (error: any) {
      toast({
        title: "Error updating family",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (externalOpen === undefined) {
    return (
      <>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setInternalOpen(true)}
          className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
        >
          <Settings className="h-4 w-4" />
        </Button>

        <Dialog open={internalOpen} onOpenChange={setInternalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Family</DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Family Name
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your family name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Tell us about your family"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => setInternalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!formData.name || loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <Dialog open={externalOpen} onOpenChange={externalOnOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Family</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Family Name
            </label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your family name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Tell us about your family"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => externalOnOpenChange?.(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!formData.name || loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
