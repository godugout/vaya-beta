
import { Link, useLocation } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { Home, Mic, Archive, Users, Menu, Volume2, Plus, Camera, Bookmark, MessageCircle } from "lucide-react";
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

  // Actions for the bottom bar
  const quickActions = [
    {
      name: "Add Memory",
      action: () => navigate("/memory-lane?add=true"),
      icon: Plus,
      primary: true
    },
    {
      name: "Voice",
      action: onVoiceToggle,
      icon: Volume2,
      active: isVoiceActive
    },
    {
      name: "Chat",
      action: () => navigate("/share-stories?chat=true"),
      icon: MessageCircle
    },
    {
      name: "Capture",
      action: () => navigate("/share-stories?mode=capture"),
      icon: Camera
    }
  ];

  return (
    <div className="mobile-bottom-nav fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <div className={cn(
        "flex justify-around items-center",
        isSimplifiedView ? "h-20" : "h-16"
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
      
      {/* Quick Action Bar */}
      <div className="flex items-center justify-around py-2 px-4 border-t border-gray-200 dark:border-gray-700">
        {quickActions.map((action) => (
          <button
            key={action.name}
            onClick={action.action}
            className={cn(
              "flex flex-col items-center justify-center p-2 rounded-lg transition-colors",
              action.active 
                ? "text-ui-orange bg-ui-orange/10" 
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800",
              action.primary && "text-ui-orange"
            )}
            aria-label={action.name}
          >
            <action.icon 
              className={cn(
                "h-5 w-5 mb-1",
                action.active && "animate-pulse",
                isSimplifiedView && "h-6 w-6",
                action.primary && "text-ui-orange"
              )} 
            />
            <span className={cn(
              "text-xs",
              isSimplifiedView && "text-sm"
            )}>{action.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
