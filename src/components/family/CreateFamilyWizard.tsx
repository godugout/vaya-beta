
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { WizardContent } from "./wizard/WizardContent";

interface CreateFamilyWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateFamilyWizard = ({ open, onOpenChange }: CreateFamilyWizardProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg z-[60]">
        <WizardContent open={open} onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
};
