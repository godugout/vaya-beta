
import { Link, useLocation } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { Home, Mic, Archive, Users, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileBottomNavProps {
  user: User | null;
  navigate: (path: string) => void;
}

export const MobileBottomNav = ({ user, navigate }: MobileBottomNavProps) => {
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
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1E293B] border-t border-gray-200 dark:border-gray-800 z-nav">
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
                  isActive && "animate-pulse"
                )} 
              />
              <span className="text-xs font-medium">{item.name}</span>
              {isActive && (
                <span className="absolute top-0 w-1/5 h-0.5 bg-ui-orange rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
