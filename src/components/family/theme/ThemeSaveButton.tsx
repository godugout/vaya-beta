
import { Button } from "@/components/ui/button";

interface ThemeSaveButtonProps {
  onSave: () => void;
}

export const ThemeSaveButton = ({ onSave }: ThemeSaveButtonProps) => {
  return (
    <div className="flex justify-end">
      <Button 
        type="button" 
        onClick={onSave}
        className="dark:bg-vaya-brand-primary dark:text-white dark:hover:bg-vaya-brand-primary/80"
      >
        Save Theme
      </Button>
    </div>
  );
};
