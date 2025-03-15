
import { Link, useLocation } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { Home, Mic, Archive, Users, Menu, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

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
      name: "Capsules",
      path: "/family-capsules",
      icon: Archive,
    },
    {
      name: "Families",
      path: "/families",
      icon: Users,
    },
    {
      name: "More",
      path: "/menu",
      icon: Menu,
    }
  ];

  return (
    <div className={cn(
      "md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1E293B] border-t border-gray-200 dark:border-gray-800 z-nav",
      isSimplifiedView && "simplified-nav"
    )}>
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
                  ? "text-ui-orange" 
                  : "text-gray-600 dark:text-gray-400 hover:text-ui-orange dark:hover:text-ui-orange"
              )}
            >
              <item.icon 
                className={cn(
                  "h-5 w-5 mb-1",
                  isActive && "animate-pulse",
                  isSimplifiedView && "h-6 w-6 mb-2"
                )} 
              />
              <span className={cn(
                "text-xs font-medium",
                isSimplifiedView && "text-sm"
              )}>{item.name}</span>
              {isActive && (
                <span className="absolute top-0 w-1/5 h-0.5 bg-ui-orange rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
      
      {onVoiceToggle && (
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
          <button
            onClick={onVoiceToggle}
            className={cn(
              "flex items-center justify-center h-12 w-12 rounded-full shadow-lg",
              isVoiceActive 
                ? "bg-ui-orange text-white animate-pulse" 
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
            )}
          >
            <Volume2 className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
};
