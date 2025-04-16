
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";

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
              "rounded-full transition-colors relative h-10 w-10",
              isActive && "bg-black/10 dark:bg-white/10"
            )}
          >
            <Mic className={cn(
              "h-5 w-5 transition-colors",
              isActive ? "text-autumn" : "text-muted-foreground"
            )} />
            
            {isActive && (
              <motion.span 
                className="absolute -top-1 -right-1 w-3 h-3 bg-autumn rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {isActive ? "Turn off voice navigation" : "Turn on voice navigation"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
