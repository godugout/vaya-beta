
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
      <div className="container mx-auto flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <LogoSection />
        </div>
        
        {/* Center: Main navigation */}
        <div className="flex-grow flex justify-center">
          <NavigationItems user={user} isSimplifiedView={isSimplifiedView} />
        </div>
        
        {/* Right: User controls */}
        <div className="flex-shrink-0">
          <UserControls 
            user={user}
            handleSignOut={handleSignOut}
            navigate={navigate}
            isVoiceActive={isVoiceActive}
            onVoiceToggle={onVoiceToggle}
          />
        </div>
      </div>
    </div>
  );
};
