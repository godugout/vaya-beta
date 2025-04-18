
import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { VoiceControlButton } from "./VoiceControlButton";
import { UserMenu } from "../UserMenu";
import { GuestMenu } from "../GuestMenu";
import { Button } from "@/components/ui/button";
import { Bell, Search, PlusCircle, Globe } from "lucide-react";
import AddMemoryModal from "@/components/memory/AddMemoryModal";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

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
  const [showMemoryModal, setShowMemoryModal] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <div className="relative hidden md:flex items-center">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="h-10 rounded-full bg-background/80 border border-border pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-autumn w-[180px] lg:w-[220px] focus:w-[240px] transition-all duration-300"
        />
      </div>
      
      <ThemeToggle variant="icon" />
      
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full h-9 w-9 flex md:hidden"
      >
        <Globe className="h-4 w-4 text-muted-foreground" />
      </Button>
      
      {user && (
        <>
          <Button 
            variant="outline" 
            size="icon" 
            className="hidden md:flex rounded-full h-10 w-10 hover:bg-autumn/10 hover:text-autumn hover:border-autumn transition-colors"
            onClick={() => setShowMemoryModal(true)}
          >
            <PlusCircle className="h-5 w-5 text-muted-foreground" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden md:flex rounded-full h-10 w-10 hover:bg-leaf/10 hover:text-leaf transition-colors"
          >
            <Bell className="h-5 w-5 text-muted-foreground" />
          </Button>
        </>
      )}
      
      <VoiceControlButton 
        isActive={isVoiceActive}
        onToggle={onVoiceToggle}
      />
      
      {user && handleSignOut && navigate ? (
        <UserMenu user={user} handleSignOut={handleSignOut} navigate={navigate} />
      ) : navigate ? (
        <GuestMenu navigate={navigate} />
      ) : null}

      {showMemoryModal && (
        <AddMemoryModal
          open={showMemoryModal}
          onOpenChange={setShowMemoryModal}
        />
      )}
    </div>
  );
};
