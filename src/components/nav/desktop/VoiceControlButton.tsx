
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface VoiceControlButtonProps {
  isActive: boolean;
  onToggle: () => void;
}

export const VoiceControlButton = ({ isActive, onToggle }: VoiceControlButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggle}
            aria-pressed={isActive}
            aria-label="Toggle voice navigation"
            className={cn(
              "rounded-full transition-colors",
              isActive && "bg-black/10 dark:bg-white/10"
            )}
          >
            <Mic className={cn(
              "h-5 w-5 transition-colors",
              isActive ? "text-autumn" : "text-muted-foreground"
            )} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {isActive ? "Turn off voice navigation" : "Turn on voice navigation"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
