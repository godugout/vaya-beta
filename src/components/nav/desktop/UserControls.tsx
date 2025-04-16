
import { User } from "@supabase/supabase-js";
import { VoiceControlButton } from "./VoiceControlButton";
import { UserMenu } from "../UserMenu";
import { GuestMenu } from "../GuestMenu";
import { Button } from "@/components/ui/button";
import { Bell, Search } from "lucide-react";

interface UserControlsProps {
  user: User | null;
  handleSignOut: () => Promise<void>;
  navigate: (path: string) => void;
  isVoiceActive: boolean;
  onVoiceToggle: () => void;
}

export const UserControls = ({ 
  user, 
  handleSignOut, 
  navigate, 
  isVoiceActive,
  onVoiceToggle 
}: UserControlsProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative hidden md:flex items-center">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="h-9 rounded-full bg-background/80 border border-border pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-autumn w-[180px] lg:w-[220px] focus:w-[240px] transition-all duration-300"
        />
      </div>
      
      {user && (
        <Button variant="ghost" size="icon" className="hidden md:flex rounded-full">
          <Bell className="h-5 w-5 text-muted-foreground" />
        </Button>
      )}
      
      <VoiceControlButton 
        isActive={isVoiceActive}
        onToggle={onVoiceToggle}
      />
      
      {user ? (
        <UserMenu user={user} handleSignOut={handleSignOut} navigate={navigate} />
      ) : (
        <GuestMenu navigate={navigate} />
      )}
    </div>
  );
};
