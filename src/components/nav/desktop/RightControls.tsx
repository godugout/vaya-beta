
import { User } from "@supabase/supabase-js";
import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserMenu } from "../UserMenu";
import { GuestMenu } from "../GuestMenu";
import { cn } from "@/lib/utils";

interface RightControlsProps {
  user: User | null;
  handleSignOut: () => Promise<void>;
  navigate: (path: string) => void;
  isVoiceActive: boolean;
  onVoiceToggle: () => void;
}

export const RightControls = ({ 
  user, 
  handleSignOut, 
  navigate, 
  isVoiceActive,
  onVoiceToggle 
}: RightControlsProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onVoiceToggle}
        aria-pressed={isVoiceActive}
        aria-label="Toggle voice navigation"
        className={cn(
          "rounded-full transition-colors",
          isVoiceActive && "bg-black/10 dark:bg-white/10"
        )}
      >
        <Mic className={cn(
          "h-5 w-5 transition-colors",
          isVoiceActive ? "text-autumn" : "text-muted-foreground"
        )} />
      </Button>
      
      {user ? (
        <UserMenu user={user} handleSignOut={handleSignOut} navigate={navigate} />
      ) : (
        <GuestMenu navigate={navigate} />
      )}
    </div>
  );
};
