
import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { UserMenu } from "./UserMenu";
import { GuestMenu } from "./GuestMenu";
import { NavGlyphItem } from "./NavGlyphItem";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Mic, 
  Image, 
  Archive, 
  Users, 
  Settings, 
  Palette,
  Volume2
} from "lucide-react";

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
  const mainNavItems = [
    {
      label: "Home",
      path: "/",
      icon: <Home size={24} />,
      description: "Dashboard and welcome"
    },
    {
      label: "Stories",
      path: "/share-stories",
      icon: <Mic size={24} />,
      description: "Record and share family stories"
    },
    {
      label: "Memories",
      path: "/memory-lane",
      icon: <Image size={24} />,
      description: "Browse family photos and memories"
    },
    {
      label: "Capsules",
      path: "/family-capsules",
      icon: <Archive size={24} />,
      description: "Time capsules for your family"
    },
    {
      label: "Media",
      path: "/media-library",
      icon: <Palette size={24} />,
      description: "Your family media library"
    },
  ];
  
  // Add the Families nav item only for logged-in users
  const userSpecificItems = user ? [
    {
      label: "Family",
      path: "/families",
      icon: <Users size={24} />,
      description: "Manage your family connections"
    }
  ] : [];
  
  // Combine all nav items
  const allNavItems = [...mainNavItems, ...userSpecificItems];

  return (
    <div className="hidden md:block py-3 px-6">
      <div className="flex items-center justify-between relative h-20">
        {/* Glyph navigation - evenly spaced */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 flex items-center justify-start gap-4">
          {allNavItems.slice(0, Math.floor(allNavItems.length / 2)).map((item) => (
            <NavGlyphItem
              key={item.path}
              to={item.path}
              icon={item.icon}
              label={item.label}
              description={item.description}
            />
          ))}
        </div>
        
        {/* Centered logo and brand */}
        <button 
          onClick={() => navigate('/')} 
          className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
          aria-label="Go to homepage"
        >
          <div className="relative h-16 w-16 rounded-lg bg-black flex items-center justify-center overflow-hidden">
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
              className="h-12 w-12 object-contain"
            />
          </div>
          <span className="text-xl font-heading font-semibold tracking-widest uppercase text-forest dark:text-autumn">
            VAYA
          </span>
        </button>
        
        {/* Right side navigation */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 flex items-center justify-end gap-4">
          {allNavItems.slice(Math.floor(allNavItems.length / 2)).map((item) => (
            <NavGlyphItem
              key={item.path}
              to={item.path}
              icon={item.icon}
              label={item.label}
              description={item.description}
            />
          ))}
          
          {/* Voice control button */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onVoiceToggle}
            aria-pressed={isVoiceActive}
            aria-label="Toggle voice navigation"
            className={cn(
              "rounded-full transition-colors ml-2 h-12 w-12",
              isVoiceActive && "bg-autumn/10 dark:bg-autumn/20"
            )}
          >
            <Volume2 className={cn(
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
