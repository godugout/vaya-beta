
import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { VoiceControlButton } from "./VoiceControlButton";
import { UserMenu } from "../UserMenu";
import { GuestMenu } from "../GuestMenu";
import { Button } from "@/components/ui/button";
import { Bell, Search, PlusCircle, Settings, Mic } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import AddMemoryModal from "@/components/memory/AddMemoryModal";

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
      {/* Search Bar */}
      <div className="relative hidden md:flex items-center">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
        <input 
          type="text" 
          placeholder="Search memories..." 
          className="h-10 rounded-full bg-background/80 border border-border pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-autumn w-[180px] lg:w-[220px] focus:w-[240px] transition-all duration-300"
        />
      </div>
      
      {/* Theme Toggle */}
      <ThemeToggle variant="icon" />
      
      {user && (
        <>
          {/* Create Button */}
          <Button 
            variant="autumn"
            onClick={() => setShowMemoryModal(true)}
            className="hidden md:flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Create Story</span>
          </Button>

          {/* Quick Record Button */}
          <Button 
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full h-10 w-10"
            onClick={() => setShowMemoryModal(true)}
          >
            <Mic className="h-5 w-5 text-autumn" />
          </Button>
          
          {/* Notifications */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden md:flex rounded-full h-10 w-10"
          >
            <Bell className="h-5 w-5 text-muted-foreground" />
          </Button>
        </>
      )}
      
      {/* Voice Navigation */}
      <VoiceControlButton 
        isActive={isVoiceActive}
        onToggle={onVoiceToggle}
      />
      
      {/* User Menu */}
      {user && handleSignOut && navigate ? (
        <UserMenu user={user} handleSignOut={handleSignOut} navigate={navigate} />
      ) : navigate ? (
        <GuestMenu navigate={navigate} />
      ) : null}

      {/* Memory Creation Modal */}
      {showMemoryModal && (
        <AddMemoryModal
          open={showMemoryModal}
          onOpenChange={setShowMemoryModal}
        />
      )}
    </div>
  );
};
