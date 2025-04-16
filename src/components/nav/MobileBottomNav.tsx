
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
    <div className="mobile-bottom-nav">
      <div className={cn(
        "flex justify-around items-center h-16",
        isSimplifiedView && "h-20"
      )}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link 
              key={item.name}
              to={item.path}
              className={cn(
                "nav-item flex flex-col items-center justify-center w-full h-full transition-colors",
                isActive 
                  ? "text-ui-orange" 
                  : "text-gray-600 dark:text-gray-400 hover:text-ui-orange dark:hover:text-ui-orange",
                isSimplifiedView && "simplified-nav-item"
              )}
              aria-current={isActive ? "page" : undefined}
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
              "flex items-center justify-center rounded-full shadow-lg",
              isSimplifiedView ? "h-14 w-14" : "h-12 w-12",
              isVoiceActive 
                ? "bg-ui-orange text-white animate-pulse" 
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
            )}
            aria-label={isVoiceActive ? "Disable voice navigation" : "Enable voice navigation"}
            aria-pressed={isVoiceActive}
          >
            <Volume2 className={cn(
              "h-6 w-6",
              isSimplifiedView && "h-7 w-7"
            )} />
          </button>
        </div>
      )}
    </div>
  );
};
