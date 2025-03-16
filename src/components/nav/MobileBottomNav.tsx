
import { Link, useLocation } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { Home, Mic, Archive, Users, Menu, Volume2, Image, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MobileBottomNavProps {
  user: User | null;
  navigate: (path: string) => void;
  isSimplifiedView?: boolean;
  isVoiceActive?: boolean;
  onVoiceToggle?: () => void;
}

export const MobileBottomNav = ({ 
  user, 
  navigate, 
  isSimplifiedView = false,
  isVoiceActive = false, 
  onVoiceToggle
}: MobileBottomNavProps) => {
  const location = useLocation();
  
  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "Stories",
      path: "/share-stories",
      icon: Mic,
    },
    {
      name: "Memories",
      path: "/memory-lane",
      icon: Image,
    },
    {
      name: "Capsules",
      path: "/family-capsules",
      icon: Archive,
    },
    {
      name: "Media",
      path: "/media-library",
      icon: Palette,
    }
  ];
  
  // Only show Families for logged-in users
  if (user) {
    navItems.push({
      name: "Family",
      path: "/families",
      icon: Users,
    });
  }

  return (
    <div className={cn(
      "md:hidden fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-white/10 z-nav",
      isSimplifiedView && "simplified-nav"
    )}>
      {/* Subtle stars/nebula effect for bottom nav */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute inset-0">
          <span className="absolute h-0.5 w-0.5 bg-white rounded-full top-1 left-[10%]"></span>
          <span className="absolute h-0.5 w-0.5 bg-white rounded-full top-2 left-[30%]"></span>
          <span className="absolute h-0.5 w-0.5 bg-white rounded-full top-3 left-[50%]"></span>
          <span className="absolute h-0.5 w-0.5 bg-white rounded-full top-2 left-[70%]"></span>
          <span className="absolute h-0.5 w-0.5 bg-white rounded-full top-1 left-[90%]"></span>
        </div>
      </div>
      
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link 
              key={item.name}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full transition-colors",
                isActive 
                  ? "text-autumn" 
                  : "text-gray-500"
              )}
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "flex items-center justify-center rounded-full p-1",
                  isActive && "bg-autumn/10"
                )}
              >
                <item.icon 
                  className={cn(
                    "h-5 w-5 mb-1",
                    isActive && "filter drop-shadow(0 0 3px rgba(242, 153, 45, 0.5))",
                    isSimplifiedView && "h-6 w-6 mb-1"
                  )} 
                />
              </motion.div>
              <span className={cn(
                "text-xs font-medium",
                isSimplifiedView && "text-sm"
              )}>{item.name}</span>
              {isActive && (
                <motion.span 
                  layoutId="mobileActiveIndicator"
                  className="absolute bottom-1 w-1 h-1 bg-autumn rounded-full filter drop-shadow(0 0 2px rgba(242, 153, 45, 0.5))" 
                />
              )}
            </Link>
          );
        })}
      </div>
      
      {onVoiceToggle && (
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onVoiceToggle}
            className={cn(
              "flex items-center justify-center h-12 w-12 rounded-full shadow-lg border",
              isVoiceActive 
                ? "bg-autumn text-black dark:bg-autumn dark:text-black animate-pulse border-autumn/50" 
                : "bg-black/70 text-gray-400 border-white/10 backdrop-blur"
            )}
          >
            <Volume2 className="h-6 w-6" />
          </motion.button>
        </div>
      )}
    </div>
  );
};
