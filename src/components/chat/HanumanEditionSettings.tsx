
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Settings } from 'lucide-react';
import { FamilyContextForm } from './FamilyContextForm';
import { FamilyContext } from './types';

interface HanumanEditionSettingsProps {
  familyContext: any;
  saveFamilyContext: (context: FamilyContext) => Promise<void>;
}

export const HanumanEditionSettings: React.FC<HanumanEditionSettingsProps> = ({
  familyContext,
  saveFamilyContext
}) => {
  const [open, setOpen] = useState(false);

  const handleSave = async (context: FamilyContext) => {
    await saveFamilyContext(context);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1 text-amber-600 border-amber-300 hover:border-amber-400 hover:bg-amber-50"
        >
          <Settings className="h-4 w-4" />
          <span>Family Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
        <FamilyContextForm 
          initialContext={familyContext || {}}
          onSave={handleSave}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
