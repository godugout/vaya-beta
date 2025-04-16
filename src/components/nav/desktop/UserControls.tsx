
import { User } from "@supabase/supabase-js";
import { VoiceControlButton } from "./VoiceControlButton";
import { UserMenu } from "../UserMenu";
import { GuestMenu } from "../GuestMenu";

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
