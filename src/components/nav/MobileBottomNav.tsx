import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Home, Clock, Box, Mic } from "lucide-react";
import { User } from "@supabase/supabase-js";

interface MobileBottomNavProps {
  user: User | null;
  navigate: (path: string) => void;
}

export const MobileBottomNav = ({ user, navigate }: MobileBottomNavProps) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#222222] border-t z-50">
      <div className="flex justify-around items-center h-16 px-4">
        <Link
          to="/"
          className="flex flex-col items-center text-gray-300 hover:text-white"
        >
          <span className="text-xs mb-1">Home</span>
          <Home className="h-6 w-6" />
        </Link>
        <Link
          to="/share-stories"
          className="flex flex-col items-center text-gray-300 hover:text-white"
        >
          <span className="text-xs mb-1">Share</span>
          <Mic className="h-6 w-6" />
        </Link>
        <Link
          to="/memory-lane"
          className="flex flex-col items-center text-gray-300 hover:text-white"
        >
          <span className="text-xs mb-1">Memory Lane</span>
          <Clock className="h-6 w-6" />
        </Link>
        <Link
          to="/family-capsules"
          className="flex flex-col items-center text-gray-300 hover:text-white"
        >
          <span className="text-xs mb-1">Capsules</span>
          <Box className="h-6 w-6" />
        </Link>
        {!user && (
          <Button 
            onClick={() => navigate("/auth")}
            className="bg-vaya-secondary hover:bg-vaya-secondary/90 text-white px-4 py-2 rounded-full text-sm"
          >
            Sign In
            <Box className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};