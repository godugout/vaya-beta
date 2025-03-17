
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Languages, Settings } from "lucide-react";

interface NarraHeaderProps {
  isSpanish: boolean;
  toggleLanguage: () => void;
}

export const NarraHeader = ({ isSpanish, toggleLanguage }: NarraHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8 bg-lovable-blue text-white">
          <AvatarFallback>N</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold">Narra</h2>
          <p className="text-xs text-gray-500">Your storytelling companion</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleLanguage}
          title={isSpanish ? "Switch to English" : "Cambiar a Español"}
        >
          <Languages className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" title="Settings">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
