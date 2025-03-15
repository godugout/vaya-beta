
import { Link, useLocation } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { UserMenu } from "./UserMenu";
import { cn } from "@/lib/utils";
import { Home, Mic, Archive, Users } from "lucide-react";

interface DesktopNavProps {
  user: User | null;
  handleSignOut: () => Promise<void>;
  navigate: (path: string) => void;
}

export const DesktopNav = ({ user, handleSignOut, navigate }: DesktopNavProps) => {
  const location = useLocation();
  
  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "Share Stories",
      path: "/share-stories",
      icon: Mic,
    },
    {
      name: "Family Capsules",
      path: "/family-capsules",
      icon: Archive,
    },
    {
      name: "Families",
      path: "/families",
      icon: Users,
    }
  ];

  return (
    <div className="hidden md:flex h-20 bg-white dark:bg-[#1E293B] border-b border-gray-200 dark:border-gray-800 px-6 items-center justify-between">
      <div className="flex items-center">
        <Link to="/" className="flex items-center mr-8">
          <div className="h-10 w-10 text-ui-orange">
            {/* Nature wave logo */}
            <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 15 Q 25 5, 40 15 T 70 15" stroke="currentColor" strokeWidth="3" fill="none" />
              <path d="M10 25 Q 25 15, 40 25 T 70 25" stroke="currentColor" strokeWidth="3" fill="none" />
              <path d="M10 35 Q 25 25, 40 35 T 70 35" stroke="currentColor" strokeWidth="3" fill="none" />
            </svg>
          </div>
          <span className="font-heading font-bold text-2xl text-ui-orange ml-2">Vaya</span>
        </Link>
        
        <nav className="flex space-x-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-2 rounded-md font-medium text-sm transition-colors relative",
                  isActive 
                    ? "text-ui-orange" 
                    : "text-gray-600 dark:text-gray-300 hover:text-ui-orange dark:hover:text-ui-orange"
                )}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ui-orange rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="flex items-center gap-4">
        {user ? (
          <UserMenu user={user} handleSignOut={handleSignOut} navigate={navigate} />
        ) : (
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => navigate('/auth')}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-ui-orange dark:hover:text-ui-orange"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/auth?register=true')}
              className="px-4 py-2 rounded-md bg-ui-orange text-white text-sm font-medium hover:bg-ui-orange/90"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
