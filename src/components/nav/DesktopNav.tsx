
import { User } from "@supabase/supabase-js";
import { LogoSection } from "./desktop/LogoSection";
import { NavigationItems } from "./desktop/NavigationItems";
import { UserControls } from "./desktop/UserControls";

interface DesktopNavProps {
  user?: User | null;
  handleSignOut?: () => Promise<void>;
  navigate?: (path: string) => void;
  isSimplifiedView?: boolean;
  isVoiceActive?: boolean;
  onVoiceToggle?: () => void;
  showMinimizeButton?: boolean;
  onToggleMinimize?: () => void;
  isMinimized?: boolean;
  className?: string;
}

export const DesktopNav = ({ 
  user, 
  handleSignOut, 
  navigate, 
  isSimplifiedView,
  isVoiceActive,
  onVoiceToggle,
  showMinimizeButton,
  onToggleMinimize,
  isMinimized,
  className
}: DesktopNavProps) => {
  return (
    <div className={`desktop-nav h-full flex items-center ${className || ''}`}>
      <div className="container mx-auto px-4 flex items-center justify-between gap-4 h-full">
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
          {user && handleSignOut && navigate && isVoiceActive !== undefined && onVoiceToggle && (
            <UserControls 
              user={user}
              handleSignOut={handleSignOut}
              navigate={navigate}
              isVoiceActive={isVoiceActive}
              onVoiceToggle={onVoiceToggle}
            />
          )}
        </div>
      </div>
    </div>
  );
};
