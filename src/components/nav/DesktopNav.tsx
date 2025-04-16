
import { User } from "@supabase/supabase-js";
import { Logo } from "./desktop/Logo";
import { MainNavItems } from "./desktop/MainNavItems";
import { RightControls } from "./desktop/RightControls";

interface DesktopNavProps {
  user: User | null;
  handleSignOut: () => Promise<void>;
  navigate: (path: string) => void;
  isSimplifiedView: boolean;
  isVoiceActive: boolean;
  onVoiceToggle: () => void;
}

export const DesktopNav = ({ 
  user, 
  handleSignOut, 
  navigate, 
  isSimplifiedView,
  isVoiceActive,
  onVoiceToggle
}: DesktopNavProps) => {
  return (
    <div className="desktop-nav">
      <div className="flex items-center justify-between">
        {/* Logo and main navigation */}
        <div className="flex items-center gap-8">
          <Logo />
          <MainNavItems user={user} isSimplifiedView={isSimplifiedView} />
        </div>
        
        {/* Right side controls */}
        <RightControls 
          user={user}
          handleSignOut={handleSignOut}
          navigate={navigate}
          isVoiceActive={isVoiceActive}
          onVoiceToggle={onVoiceToggle}
        />
      </div>
    </div>
  );
};
