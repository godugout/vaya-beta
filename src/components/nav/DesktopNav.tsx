
import { User } from "@supabase/supabase-js";
import { LogoSection } from "./desktop/LogoSection";
import { NavigationItems } from "./desktop/NavigationItems";
import { UserControls } from "./desktop/UserControls";

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
          <LogoSection />
          <NavigationItems user={user} isSimplifiedView={isSimplifiedView} />
        </div>
        
        {/* Right side controls */}
        <UserControls 
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
