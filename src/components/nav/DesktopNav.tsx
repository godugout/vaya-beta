
import { User } from "@supabase/supabase-js";
import { LogoSection } from "./desktop/LogoSection";
import { NavigationItems } from "./desktop/NavigationItems";
import { UserControls } from "./desktop/UserControls";
import { useNavigate } from "react-router-dom";

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
  const defaultNavigate = useNavigate();
  
  // Use the provided navigate function or the default from useNavigate
  const navigateFunction = navigate || ((path: string) => defaultNavigate(path));

  return (
    <div className={`desktop-nav ${className || ''}`}>
      <div className="container mx-auto px-4 flex items-center justify-between h-full">
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
          {isVoiceActive !== undefined && onVoiceToggle && (
            <UserControls 
              user={user || null}
              handleSignOut={handleSignOut || (async () => {})}
              navigate={navigateFunction}
              isVoiceActive={isVoiceActive}
              onVoiceToggle={onVoiceToggle}
            />
          )}
        </div>
      </div>
    </div>
  );
};
