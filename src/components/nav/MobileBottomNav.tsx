import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Home, Clock, Box, Mic } from "lucide-react";
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
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#222222] border-t z-50">
      <div className="flex justify-around items-center h-20 px-4">
        <Link
          to="/"
          className={`flex flex-col items-center transition-colors duration-200 ${
            isActive('/') ? 'text-white' : 'text-gray-300'
          } hover:text-white relative`}
        >
          <span className="text-sm mb-1">Home</span>
          <Home className="h-7 w-7" />
          {isActive('/') && (
            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-vaya-capsules" />
          )}
        </Link>
        <Link
          to="/share-stories"
          className={`flex flex-col items-center transition-colors duration-200 ${
            isActive('/share-stories') ? 'text-white' : 'text-gray-300'
          } hover:text-white relative`}
        >
          <span className="text-sm mb-1">Share</span>
          <Mic className="h-7 w-7" />
          {isActive('/share-stories') && (
            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-vaya-capsules" />
          )}
        </Link>
        <Link
          to="/memory-lane"
          className={`flex flex-col items-center transition-colors duration-200 ${
            isActive('/memory-lane') ? 'text-white' : 'text-gray-300'
          } hover:text-white relative`}
        >
          <span className="text-sm mb-1">Memory Lane</span>
          <Clock className="h-7 w-7" />
          {isActive('/memory-lane') && (
            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-vaya-capsules" />
          )}
        </Link>
        <Link
          to="/family-capsules"
          className={`flex flex-col items-center transition-colors duration-200 ${
            isActive('/family-capsules') ? 'text-white' : 'text-gray-300'
          } hover:text-white relative`}
        >
          <span className="text-sm mb-1">Capsules</span>
          <Box className="h-7 w-7" />
          {isActive('/family-capsules') && (
            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-vaya-capsules" />
          )}
        </Link>
        {!user && (
          <Button 
            onClick={() => navigate("/auth")}
            className="bg-vaya-capsules hover:bg-vaya-capsules/90 text-white text-sm px-4 py-2 rounded-full"
          >
            Sign In
            <Box className="ml-2 h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};