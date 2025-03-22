
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

interface NarraHeaderProps {
  isSpanish: boolean;
  toggleLanguage: () => void;
}

export const NarraHeader = ({ isSpanish, toggleLanguage }: NarraHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
        <div className="bg-lovable-blue text-white w-8 h-8 rounded-full flex items-center justify-center">
          N
        </div>
        <div>
          <h2 className="text-lg font-medium">Narra</h2>
          <p className="text-xs text-muted-foreground">Family Storytelling Companion</p>
        </div>
      </div>
      
      <Button variant="ghost" size="sm" onClick={toggleLanguage}>
        <Languages className="h-4 w-4 mr-2" />
        {isSpanish ? "English" : "Español"}
      </Button>
    </div>
  );
};
