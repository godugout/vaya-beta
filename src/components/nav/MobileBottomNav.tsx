
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Home, Clock, Archive, Mic, User } from "lucide-react";
import { User as UserType } from "@supabase/supabase-js";

interface MobileBottomNavProps {
  user: UserType | null;
  navigate: (path: string) => void;
}

export const MobileBottomNav = ({ user, navigate }: MobileBottomNavProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-greystone-green border-t z-50">
      <div className="flex justify-around items-center h-16 px-4">
        <Link
          to="/"
          className={`flex flex-col items-center transition-all duration-200 ${
            isActive('/') ? 'text-white' : 'text-greystone-green-30'
          } hover:text-white relative group`}
        >
          <Home className={`h-6 w-6 transition-colors duration-200 ${
            isActive('/') ? 'text-white' : 'group-hover:text-white'
          }`} />
          <span className="text-xs mt-1 group-hover:text-white">Home</span>
          {isActive('/') && (
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-white rounded-full" />
          )}
        </Link>
        <Link
          to="/share-stories"
          className={`flex flex-col items-center transition-all duration-200 ${
            isActive('/share-stories') ? 'text-white' : 'text-greystone-green-30'
          } hover:text-white relative group`}
        >
          <Mic className={`h-6 w-6 transition-colors duration-200 ${
            isActive('/share-stories') ? 'text-white' : 'group-hover:text-white'
          }`} />
          <span className="text-xs mt-1 group-hover:text-white">Record</span>
          {isActive('/share-stories') && (
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-white rounded-full" />
          )}
        </Link>
        <Link
          to="/memory-lane"
          className={`flex flex-col items-center transition-all duration-200 ${
            isActive('/memory-lane') ? 'text-white' : 'text-greystone-green-30'
          } hover:text-white relative group`}
        >
          <Clock className={`h-6 w-6 transition-colors duration-200 ${
            isActive('/memory-lane') ? 'text-white' : 'group-hover:text-white'
          }`} />
          <span className="text-xs mt-1 group-hover:text-white">Memories</span>
          {isActive('/memory-lane') && (
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-white rounded-full" />
          )}
        </Link>
        <Link
          to="/family-capsules"
          className={`flex flex-col items-center transition-all duration-200 ${
            isActive('/family-capsules') ? 'text-white' : 'text-greystone-green-30'
          } hover:text-white relative group`}
        >
          <Archive className={`h-6 w-6 transition-colors duration-200 ${
            isActive('/family-capsules') ? 'text-white' : 'group-hover:text-white'
          }`} />
          <span className="text-xs mt-1 group-hover:text-white">Capsules</span>
          {isActive('/family-capsules') && (
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-white rounded-full" />
          )}
        </Link>
        {user ? (
          <Link
            to="/profile"
            className={`flex flex-col items-center transition-all duration-200 ${
              isActive('/profile') ? 'text-white' : 'text-greystone-green-30'
            } hover:text-white relative group`}
          >
            <User className={`h-6 w-6 transition-colors duration-200 ${
              isActive('/profile') ? 'text-white' : 'group-hover:text-white'
            }`} />
            <span className="text-xs mt-1 group-hover:text-white">Profile</span>
            {isActive('/profile') && (
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-white rounded-full" />
            )}
          </Link>
        ) : (
          <Button 
            onClick={() => navigate("/auth")}
            variant="secondary"
            size="sm"
            className="rounded-full text-xs px-4 py-2"
          >
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
};
