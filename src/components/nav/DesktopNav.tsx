
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { UserMenu } from "./UserMenu";
import { GuestMenu } from "./GuestMenu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  Home, 
  Mic, 
  Image, 
  Archive, 
  Users, 
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
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const mainNavItems = [
    {
      label: "Home",
      path: "/",
      icon: <Home size={20} />,
    },
    {
      label: "Stories",
      path: "/share-stories",
      icon: <Mic size={20} />,
    },
    {
      label: "Memories",
      path: "/memory-lane",
      icon: <Image size={20} />,
    },
    {
      label: "Capsules",
      path: "/family-capsules",
      icon: <Archive size={20} />,
    },
    {
      label: "Family",
      path: "/families",
      icon: <Users size={20} />,
    },
  ];

  return (
    <div className="hidden md:block backdrop-blur-md bg-black/80 border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <motion.button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Go to homepage"
          >
            <div className="relative h-10 w-10 rounded-lg bg-black flex items-center justify-center overflow-hidden">
              <img 
                src="/lovable-uploads/2a8faf45-bcfa-46d2-8314-ee4fd404aa94.png" 
                alt="Vaya Logo" 
                className="h-7 w-7 object-contain"
              />
            </div>
            <span className="font-heading font-bold text-xl text-white">Vaya</span>
          </motion.button>
          
          <nav className="flex gap-1 ml-6">
            {mainNavItems.map((item) => (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive(item.path) 
                    ? "text-autumn bg-white/10" 
                    : "text-white/70 hover:text-white hover:bg-white/10"
                )}
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
              >
                {item.icon}
                <span>{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Voice navigation toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onVoiceToggle}
            aria-pressed={isVoiceActive}
            aria-label="Toggle voice navigation"
            className={cn(
              "rounded-full transition-colors",
              isVoiceActive 
                ? "bg-autumn/10 border-autumn/30 text-autumn" 
                : "text-white/70 hover:text-white hover:bg-white/10"
            )}
          >
            <Volume2 className="h-5 w-5" />
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
