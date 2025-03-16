
import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { NavButton } from "./NavButton";
import { UserMenu } from "./UserMenu";
import { GuestMenu } from "./GuestMenu";
import { Home, Mic, Image, Archive, Users, Settings, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
    <div className="hidden md:block py-3 px-6">
      <div className="flex items-center justify-between relative">
        {/* Left side navigation */}
        <div className="flex items-center gap-1 nav-menu-left">
          <NavButton 
            to="/" 
            icon={<Home size={isSimplifiedView ? 20 : 16} />} 
            label="Home" 
            isSimplified={isSimplifiedView}
          />
          <NavButton 
            to="/share-stories" 
            icon={<Mic size={isSimplifiedView ? 20 : 16} />} 
            label="Stories" 
            isSimplified={isSimplifiedView}
          />
          <NavButton 
            to="/memory-lane" 
            icon={<Image size={isSimplifiedView ? 20 : 16} />} 
            label="Memories" 
            isSimplified={isSimplifiedView}
          />
        </div>
        
        {/* Centered logo and brand */}
        <button 
          onClick={() => navigate('/')} 
          className="flex flex-col items-center gap-1 absolute left-1/2 transform -translate-x-1/2"
          aria-label="Go to homepage"
        >
          <div className="relative h-12 w-12 rounded-lg bg-black flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              {/* Star dots background */}
              <span className="absolute h-1 w-1 bg-white rounded-full top-1 left-1"></span>
              <span className="absolute h-1 w-1 bg-white rounded-full top-2 right-3"></span>
              <span className="absolute h-0.5 w-0.5 bg-white rounded-full bottom-2 left-3"></span>
              <span className="absolute h-0.5 w-0.5 bg-white rounded-full bottom-1 right-1"></span>
            </div>
            <img 
              src="/lovable-uploads/2a8faf45-bcfa-46d2-8314-ee4fd404aa94.png" 
              alt="Vaya Logo" 
              className="h-9 w-9 object-contain"
            />
          </div>
          <span className="text-lg font-heading font-semibold tracking-widest uppercase text-forest dark:text-autumn">
            Vaya
          </span>
        </button>
        
        {/* Right side navigation */}
        <div className="flex items-center gap-1 nav-menu-right">
          <NavButton 
            to="/family-capsules" 
            icon={<Archive size={isSimplifiedView ? 20 : 16} />} 
            label="Capsules" 
            isSimplified={isSimplifiedView}
          />
          <NavButton 
            to="/media-library" 
            icon={<Palette size={isSimplifiedView ? 20 : 16} />} 
            label="Media" 
            isSimplified={isSimplifiedView}
          />
          {user && (
            <NavButton 
              to="/families" 
              icon={<Users size={isSimplifiedView ? 20 : 16} />} 
              label="Family" 
              isSimplified={isSimplifiedView}
            />
          )}
          
          {/* Voice control button */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onVoiceToggle}
            aria-pressed={isVoiceActive}
            aria-label="Toggle voice navigation"
            className={cn(
              "rounded-full transition-colors ml-2",
              isVoiceActive && "bg-autumn/10 dark:bg-autumn/20"
            )}
          >
            <Mic className={cn(
              "h-5 w-5 transition-colors",
              isVoiceActive ? "text-autumn" : "text-muted-foreground"
            )} />
          </Button>
          
          {/* User menu */}
          {user ? (
            <UserMenu user={user} handleSignOut={handleSignOut} navigate={navigate} />
          ) : (
            <GuestMenu navigate={navigate} />
          )}
        </div>
      </div>
    </div>
  );
};
