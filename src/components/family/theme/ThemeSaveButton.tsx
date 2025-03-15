
import { Button } from "@/components/ui/button";

interface ThemeSaveButtonProps {
  onSave: () => void;
}

export const ThemeSaveButton = ({ onSave }: ThemeSaveButtonProps) => {
  return (
    <div className="flex justify-end">
      <Button type="button" onClick={onSave}>
        Save Theme
      </Button>
    </div>
  );
};
